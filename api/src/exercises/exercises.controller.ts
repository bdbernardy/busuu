import { Body, Controller, Get, Post } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dtos/create-exercise.dto';
import { ExerciseDto } from './dtos/exercise.dto';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Get()
  public getAllExercises(): Promise<ExerciseDto[]> {
    return this.exercisesService.getAllExercises();
  }

  @Post()
  createExercise(
    @Body() exercise: CreateExerciseDto,
  ): Promise<ExerciseDto | null> {
    return this.exercisesService.createExercise(exercise);
  }
}
