import { IsNotEmpty, Length } from 'class-validator';
import { MAX_EXERCISE_CONTENT_LENGTH } from '../exercises.constants';

export class CreateExerciseDto {
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  @Length(0, MAX_EXERCISE_CONTENT_LENGTH)
  content: string;
}
