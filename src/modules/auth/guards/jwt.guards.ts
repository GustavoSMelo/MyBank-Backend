import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { IJWT } from '../types/jwt.interface';

export class JWTGuards implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const { headers } = context.switchToHttp().getRequest();
            const { authorization, userid } = headers;
            const validToken: IJWT = jwt.verify(
                authorization,
                process.env.JWT_PASSWORD,
            ) as IJWT;

            if (!validToken || validToken.userId != userid) return false;

            return true;
        } catch (error) {
            return false;
        }
    }
}
