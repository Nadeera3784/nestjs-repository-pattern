import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import * as morgan from 'morgan';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './modules/app/app.module';
import { urlencoded, json } from 'express';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.use(json({ limit: '50mb' }));

  app.use(urlencoded({ limit: '50mb', extended: true }));

  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );

  app.use(morgan('dev'));

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const port = process.env.PORT || 3000;

  await app.listen(port);

  return port;
}

bootstrap().then((port) =>
  console.log(`App successfully started on port ${port} !`),
);
