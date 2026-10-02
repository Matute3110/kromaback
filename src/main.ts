import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  app.enableCors(
    {
   origin: [
            'http://localhost:4200',
   ], 


   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
   allowedHeaders: 'Content-Type, Authorization, Accept',
   credentials: true,
   optionsSuccessStatus: 204,
 }
);
}
void bootstrap();
