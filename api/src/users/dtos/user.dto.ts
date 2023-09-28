import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  constructor(user: Partial<UserDto>) {
    Object.assign(this, user);
  }
}
