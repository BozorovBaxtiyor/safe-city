import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const webConfig = new DocumentBuilder()
        .setTitle('Datagaze Platform API')
        .setDescription(
            "Datagaze All in One - the system is designed for medium and large organizations, through which the organization can install other systems in the datagaze ecosystem or systems of other partner organizations on its servers, monitor the system's performance after installation, and download and update changes and new versions to the system.",
        )
        .setVersion('1.0')
        .addTag('Datagaze Platform Web')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                in: 'header',
            },
            'JWT',
        )
        .build();
    const webDocument = SwaggerModule.createDocument(app, webConfig);
    SwaggerModule.setup('api/web', app, webDocument);

    app.enableCors({
        origin: '*',
        methods: '*',
        allowedHeaders: '*',
    });

    const port = process.env.PORT || 7001;
    await app.listen(port, '0.0.0.0', () => {
        const baseUrl = process.env.BASE_URL || `http://0.0.0.0:${port}`;
        console.log(`🚀 Server running on port => ${port}`);
        console.log(`📚 Web API docs: ${baseUrl}/api/web`);
        console.log(`🤖 Agent API docs: ${baseUrl}/api/agent`);
        console.log(`🌐 Application is running in ${process.env.NODE_ENV || 'development'} mode`);
    });
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
