import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExcetionsFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interseptors/logger.interceptor';
import { ResponseTransformInterceptor } from './common/interseptors/response-transform.interceptor';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.useGlobalInterceptors(new LoggingInterceptor(), new ResponseTransformInterceptor());
    app.useGlobalFilters(new AllExcetionsFilter());
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );

    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1',
        prefix: 'api/',
    });

    const webConfig = new DocumentBuilder()
        .setTitle('Safe City Web API')
        .setDescription(
            'Safe City - A comprehensive web API for managing city safety, including user management, incident reporting, and emergency response features.',
        )
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const webDocument = SwaggerModule.createDocument(app, webConfig);
    SwaggerModule.setup('api', app, webDocument);

    app.enableCors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    });

    const port = process.env.PORT || 7001;
    await app.listen(port, '0.0.0.0', () => {
        const baseUrl = process.env.BASE_URL || `http://0.0.0.0:${port}`;
        console.log(`🚀 Server running on port => ${port}`);
        console.log(`📚 Web API docs: ${baseUrl}/api`);
        console.log(`🌐 Application is running in ${process.env.NODE_ENV || 'development'} mode`);
    });
}
bootstrap();
