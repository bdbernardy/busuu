import { Injectable } from '@nestjs/common';
import { Exercise } from './entities/exercise.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MAX_EXERCISES_PER_USER } from './exercises.constants';

@Injectable()
export class ExercisesRepository {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Exercise)
    private readonly exercisesRepository: Repository<Exercise>,
  ) {}

  public getAllExercises(): Promise<Exercise[]> {
    return this.exercisesRepository
      .createQueryBuilder('exercise')
      .innerJoinAndSelect('exercise.user', 'user')
      .orderBy('created_at', 'DESC')
      .getMany();
  }

  /**
   * Creates a new exercise if the user hasn't reached their maximum number of exercises.
   * @param createExerciseDto
   * @returns Returns the newly created Exercise, or null if the user reached their maximum number of exercises.
   */
  public createExercise(newExercise: Exercise): Promise<Exercise | null> {
    /**
     * Creating a new exercises involves two database operations:
     *  1. Fetch the user's current number of exercises
     *  2. Create the new exercise if the user hasn't reeached their maximum number of exercises
     *
     * These operations need to be done atomically to prevent the concurrent creation of two exercises
     * that could result in more than 10 exercises being created for the same user.
     *
     * With SQLLite, this can be done by running the operations in a transaction (transactions set an exclusive database-level lock).
     *
     * With a database like Postgresql, I would have used a row-level lock mechanism to avoid blocking the entire database.
     */
    return this.dataSource.transaction(async (manager) => {
      const exerciseRepository = manager.getRepository(Exercise);

      const numberOfExercises = await exerciseRepository
        .createQueryBuilder('exercise')
        .where('exercise.user_id = :userId', { userId: newExercise.user.id })
        .getCount();

      if (numberOfExercises >= MAX_EXERCISES_PER_USER) {
        return null;
      }

      await exerciseRepository.save(newExercise);

      return newExercise;
    });
  }
}
