import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
class UserDto {
  @Expose()
  name: string;
}

@Exclude()
export class ExerciseDto {
  @Expose()
  id: string;

  @Expose()
  user_id: string;

  @Expose()
  content: string;

  @Expose()
  created_at: Date;

  @Type(() => UserDto)
  @Expose()
  user: UserDto;

  constructor(exercise: Partial<ExerciseDto>) {
    Object.assign(this, exercise);
  }
}
