import { forwardRef, Module } from '@nestjs/common';
import { AccountModule } from '../account/account.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWTGuards } from './guards/jwt.guards';

@Module({
    imports: [AccountModule, JWTGuards, forwardRef(() => UserModule)],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [JWTGuards],
})
export class AuthModule {}
