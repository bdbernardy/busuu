import { Module } from '@nestjs/common';
import { ExercisesModule } from './exercises/exercises.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Exercise } from './exercises/entities/exercise.entity';

@Module({
  imports: [
    ExercisesModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      // For a more complex project, I would use Nest's Config module
      database: process.env.DATABASE_FILENAME ?? './data/db',
      entities: [User, Exercise],
      // Synchronize automatically updates the database schema. This should be off in a production-ready setup.
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
