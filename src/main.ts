import {NestFactory, Reflector} from '@nestjs/core';
import { AppModule } from './app.module';
import {AppAuthGuard} from "./auth/guard/app-auth.guard";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new AppAuthGuard(reflector));

  await app.listen(3000);
}

bootstrap();
