import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { UsersRepository } from './users/users.repository';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  /**
   * The assigment doesn't mention where the list of users come from.
   * To keep things simple, test users are loaded when the app starts.
   * This hack wouldn't be used in production.
   */
  const userRepository = app.get(UsersRepository);
  await userRepository.createUsers();

  // In a production environment, I prefer using a reverse-proxy to have the same origin and disable cors
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
