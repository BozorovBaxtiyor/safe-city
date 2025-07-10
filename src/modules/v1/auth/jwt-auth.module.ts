import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JWT_ACCESS, JWT_REFRESH } from 'src/common/constants/jwt-constants';

// jwt-auth.module.ts
@Module({
    providers: [
        {
            provide: JWT_ACCESS,
            useFactory: async (config: ConfigService): Promise<JwtService> => {
                return new JwtService({
                    secret: config.get('JWT_ACCESS_SECRET'),
                    signOptions: { expiresIn: config.get('JWT_ACCESS_EXPIRATION') },
                });
            },
            inject: [ConfigService],
        },
        {
            provide: JWT_REFRESH,
            useFactory: async (config: ConfigService): Promise<JwtService> => {
                return new JwtService({
                    secret: config.get('JWT_REFRESH_SECRET'),
                    signOptions: { expiresIn: config.get('JWT_REFRESH_EXPIRATION') },
                });
            },
            inject: [ConfigService],
        },
    ],
    exports: [JWT_ACCESS, JWT_REFRESH],
})
export class JwtAuthModule {}
