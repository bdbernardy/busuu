import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}
  public async getUsers(): Promise<UserDto[]> {
    const users = await this.usersRepository.getUsers();

    return users.map((user) => new UserDto(user));
  }
}
