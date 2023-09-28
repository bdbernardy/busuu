import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { FAKE_USERS } from './users.constants';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public getById(userId: string): Promise<User> {
    return this.usersRepository.findOneBy({ id: userId });
  }

  public async getUsers(): Promise<User[]> {
    return this.usersRepository.createQueryBuilder().orderBy('name').getMany();
  }

  /**
   * Creates fake users for testing purposes
   */
  public async createUsers(): Promise<void> {
    const has_users = await this.usersRepository
      .createQueryBuilder()
      .getExists();

    if (has_users) {
      return;
    }

    await Promise.all(
      FAKE_USERS.map(async (name) => {
        const user = this.usersRepository.create({
          id: randomUUID(),
          name,
        });

        await this.usersRepository.save(user);
      }),
    );
  }
}
