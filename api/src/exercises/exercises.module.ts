import { Module } from '@nestjs/common';
import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';
import { Exercise } from './entities/exercise.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExercisesRepository } from './exercises.repository';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise, User]), UsersModule],
  controllers: [ExercisesController],
  providers: [ExercisesService, ExercisesRepository],
})
export class ExercisesModule {}
