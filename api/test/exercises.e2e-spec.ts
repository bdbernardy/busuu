import { Test, TestingModule } from '@nestjs/testing';
import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';
import { User } from '../src/users/entities/user.entity';
import { USERS, USER_1 } from './fixtures/users.fixture';
import { Exercise } from '../src/exercises/entities/exercise.entity';
import { EXERCISES } from './fixtures/exercises.fixture';
import { MAX_EXERCISE_CONTENT_LENGTH } from '../src/exercises/exercises.constants';
import { Reflector } from '@nestjs/core';
import { randomUUID } from 'crypto';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    const reflector = app.get(Reflector);

    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );

    app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

    await app.init();

    dataSource = app.get<DataSource>(DataSource);
  });

  describe('/exercises (GET)', () => {
    beforeAll(async () => {
      const userRepository = dataSource.getRepository(User);
      const exerciseRepository = dataSource.getRepository(Exercise);

      await exerciseRepository.clear();
      await userRepository.clear();

      await userRepository.save(USERS);
      await exerciseRepository.save(EXERCISES);
    });

    it('should return list of exercises', () => {
      return request(app.getHttpServer())
        .get('/exercises')
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual(
            EXERCISES.map((exercise) => ({
              id: exercise.id,
              user_id: exercise.user.id,
              content: exercise.content,
              created_at: exercise.createdAt.toISOString(),
              user: {
                name: exercise.user.name,
              },
            })),
          );
        });
    });
  });

  describe('/exercises (POST)', () => {
    beforeAll(async () => {
      const userRepository = dataSource.getRepository(User);
      const exerciseRepository = dataSource.getRepository(Exercise);

      await exerciseRepository.clear();
      await userRepository.clear();

      await userRepository.save(USERS);
    });

    beforeEach(async () => {
      const exerciseRepository = dataSource.getRepository(Exercise);
      await exerciseRepository.clear();
    });

    it('should return Bad Request when the content is too long.', () => {
      return request(app.getHttpServer())
        .post('/exercises')
        .send({
          user_id: USER_1.id,
          content: 'a'.repeat(MAX_EXERCISE_CONTENT_LENGTH + 1),
        })
        .expect(400);
    });

    it("should return Bad Request when the user doesn't exist.", () => {
      return request(app.getHttpServer())
        .post('/exercises')
        .send({
          user_id: 'does not exist',
          content: 'Hello World',
        })
        .expect(400);
    });

    it('should create a new exercise when the user has less than 10 exercises', () => {
      return request(app.getHttpServer())
        .post('/exercises')
        .send({ user_id: USER_1.id, content: 'Hello World' })
        .expect(201)
        .expect((res) => {
          const { id, created_at, ...newExercise } = res.body;
          expect(newExercise).toEqual({
            user_id: USER_1.id,
            content: 'Hello World',
            user: {
              name: USER_1.name,
            },
          });
        });
    });

    it('should return an empty object and not create a new exercise when the user has more than 10 exercises', async () => {
      const exerciseRepository = dataSource.getRepository(Exercise);
      const exercises = Array.from({ length: 10 }, () => ({
        id: randomUUID(),
        user: USER_1,
        content: 'Content',
        createdAt: new Date(),
      }));

      await exerciseRepository.save(exercises);

      const res = await request(app.getHttpServer())
        .post('/exercises')
        .send({ user_id: USER_1.id, content: 'Hello World' })
        .expect(201);

      expect(res.body).toEqual({});

      const numberOfExercises = await exerciseRepository.count();
      expect(numberOfExercises).toBe(10);
    });
  });
});
