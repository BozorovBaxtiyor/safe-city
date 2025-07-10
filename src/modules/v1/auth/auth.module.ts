// auth.module.ts
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';

import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { AuthController } from './auth.controller';
import { JwtAuthModule } from './jwt-auth.module';

@Module({
    imports: [JwtAuthModule , DatabaseModule],
    providers: [AuthService, AuthRepository],
    controllers: [AuthController],
    exports: [
        JwtAuthModule,
        AuthRepository
    ],
})
export class AuthModule {}
