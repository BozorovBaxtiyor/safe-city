// http-auth.guard.ts
import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JWT_REFRESH } from 'src/common/constants/jwt-constants';
import { ICustomRequest, IJwtRefreshPayload } from 'src/common/types/types';

@Injectable()
export class JwtRefreshGuard implements CanActivate {
    constructor(@Inject(JWT_REFRESH) private readonly jwtRefresh: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<ICustomRequest>();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException('Token not found');
        }

        try {
            const payload = await this.jwtRefresh.verifyAsync<IJwtRefreshPayload>(token);

            request.user = payload as IJwtRefreshPayload;
        } catch {
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
