import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const logger = new Logger('Bootstrap');
  const configService = app.get<ConfigService>(ConfigService);

  const corsOrigin = configService.get<string[] | string>('app.corsOrigin');
  app.enableCors({
    origin: corsOrigin || true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
    ],
  });

  const apiPrefix = configService.get<string>('app.apiPrefix') || 'api';
  app.setGlobalPrefix(apiPrefix);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      errorHttpStatusCode: 422,
    }),
  );

  if (configService.get<string>('NODE_ENV') !== 'production') {
    const configSwagger = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('UNICAL QR Attendance API')
      .setDescription(
        'QR + fingerprint/PIN attendance backend for University of Calabar',
      )
      .setVersion('1.0')
      .addServer(
        `http://localhost:${configService.get<number>('app.port')}`,
        'Development server',
      )
      .build();

    const document = SwaggerModule.createDocument(app, configSwagger);
    SwaggerModule.setup('docs', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
        tagsSorter: 'alpha',
        operationsSorter: 'alpha',
      },
    });
  }

  const port = configService.get<number>('app.port') ?? 3000;
  await app.listen(port);
  const appUrl = `http://localhost:${port}`;
  logger.log(`Application running on ${appUrl}/${apiPrefix}`);
  logger.log(`Swagger available at ${appUrl}/docs`);
}

bootstrap().catch((error) => {
  console.error('Error starting server:', error);
  process.exit(1);
});
