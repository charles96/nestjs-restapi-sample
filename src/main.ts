import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

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
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('help', app, document);
  await app.listen(port);
}
bootstrap();