import { BadRequestException, Injectable } from '@nestjs/common';
import { ExercisesRepository } from './exercises.repository';
import { ExerciseDto } from './dtos/exercise.dto';
import { CreateExerciseDto } from './dtos/create-exercise.dto';
import { Exercise } from './entities/exercise.entity';
import { UsersRepository } from '../users/users.repository';
import { randomUUID } from 'crypto';

@Injectable()
export class ExercisesService {
  constructor(
    private exercisesRepository: ExercisesRepository,
    private usersRepository: UsersRepository,
  ) {}

  public async getAllExercises(): Promise<ExerciseDto[]> {
    const exercises = await this.exercisesRepository.getAllExercises();

    return exercises.map(this.mapExerciseEntityToDto);
  }

  public async createExercise(
    exercise: CreateExerciseDto,
  ): Promise<ExerciseDto | null> {
    const { content, user_id } = exercise;

    const user = await this.usersRepository.getById(user_id);

    if (!user) {
      throw new BadRequestException(`The user '${user_id}' does not exist.`);
    }

    const newExercise: Exercise = {
      id: randomUUID(),
      content,
      user,
      createdAt: new Date(),
    };

    const createdExercise =
      await this.exercisesRepository.createExercise(newExercise);

    return createdExercise
      ? this.mapExerciseEntityToDto(createdExercise)
      : null;
  }

  private mapExerciseEntityToDto(exercise: Exercise): ExerciseDto {
    return new ExerciseDto({
      id: exercise.id,
      user_id: exercise.user.id,
      content: exercise.content,
      created_at: exercise.createdAt,
      user: {
        name: exercise.user.name,
      },
    });
  }
}
