import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  const servicePort = configService.getOrThrow<number>('SERVICE_PORT');
  await app.listen(servicePort);

  Logger.log(`Server is running on: ${await app.getUrl()}, Swagger: ${await app.getUrl()}/api`, 'Bootstrap');
}
bootstrap();
