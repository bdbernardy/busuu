import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';
import { User } from '../src/users/entities/user.entity';
import { USERS } from './fixtures/users.fixture';
import { Exercise } from '../src/exercises/entities/exercise.entity';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/users (GET)', () => {
    beforeAll(async () => {
      const dataSource = app.get<DataSource>(DataSource);
      const userRepository = dataSource.getRepository(User);
      const exerciseRepository = dataSource.getRepository(Exercise);

      await exerciseRepository.clear();
      await userRepository.clear();

      await userRepository.save(USERS);
    });

    it('should return list of users', () => {
      return request(app.getHttpServer())
        .get('/users')
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(USERS);
        });
    });
  });
});
