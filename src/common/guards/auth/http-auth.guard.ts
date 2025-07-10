// http-auth.guard.ts
import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JWT_ACCESS } from 'src/common/constants/jwt-constants';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';

import { ICustomRequest, IJwtPayload } from '../../types/types';

@Injectable()
export class JwtHttpAuthGuard implements CanActivate {
    constructor(
        @Inject(JWT_ACCESS) private readonly jwtService: JwtService,
        private configService: ConfigService,
        private reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());
        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest<ICustomRequest>();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException('Token not found');
        }

        try {
            const payload = await this.jwtService.verifyAsync<IJwtPayload>(token);
            request.user = payload;
        } catch (error) {
            console.error('JWT verification error:', error);
            throw new UnauthorizedException('Invalid token');
        }
        return true;
    }

    private extractTokenFromHeader(request: ICustomRequest): string | null {
        const expressRequest = request as unknown as Request;
        const [type, token] = expressRequest.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : null;
    }
}
