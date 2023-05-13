import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:5173'],
    methods: ['POST', 'PUT', 'DELETE', 'GET']
  });
  const port = 3005
  await app.listen(process.env.PORT || port);
  console.log(`Running on Port: ${port}`)
}
bootstrap();
