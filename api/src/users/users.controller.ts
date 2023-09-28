import { Controller, Get } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  public getAllUsers(): Promise<UserDto[]> {
    return this.userService.getUsers();
  }
}
