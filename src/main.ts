import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger } from './logger/logger.service';
import { VersioningType } from '@nestjs/common';

const port = 3000
const options = new DocumentBuilder()
  .setTitle('title')
	.setDescription('Your API description')
  .setVersion('1.0')
  .addServer(`http://localhost:${port}/`, 'Local environment')
  //.addServer('https://staging.yourapi.com/', 'Staging')
  //.addServer('https://production.yourapi.com/', 'Production')
  .addTag('Your API Tag')
  .build();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI
  });
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('help', app, document);
  await app.listen(port);
}
bootstrap();