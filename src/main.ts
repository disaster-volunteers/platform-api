import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppAuthGuard } from './auth/guard/app-auth.guard';
import { BROKER_OPTS, BROKER_TRANSPORT } from './broker.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: BROKER_TRANSPORT,
    options: BROKER_OPTS,
  });

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new AppAuthGuard(reflector));

  await app.startAllMicroservicesAsync();

  await app.listen(3000);
}

bootstrap();
