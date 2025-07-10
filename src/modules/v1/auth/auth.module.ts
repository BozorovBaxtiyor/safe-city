// auth.module.ts
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';

import { MailerModule } from '@nestjs-modules/mailer';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { JwtAuthModule } from './jwt-auth.module';
import { AuthService } from './services/auth.service';
import { CacheService } from './services/cache.service';
import { MailService } from './services/mail.service';

@Module({
    imports: [
        JwtAuthModule,
        DatabaseModule,
        MailerModule.forRoot({
            transport: {
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            },
            defaults: {
                from: process.env.EMAIL_USER,
            },
        }),
    ],
    providers: [AuthService, AuthRepository, CacheService, MailService],
    controllers: [AuthController],
    exports: [JwtAuthModule, AuthRepository],
})
export class AuthModule {}
