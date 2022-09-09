import { Module } from '@nestjs/common';
import { AccountModule } from '../account/account.module';
import { UserModule } from '../user/user.module';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
    imports: [UserModule, AccountModule],
    controllers: [LoginController],
    providers: [LoginService],
})
export class LoginModule {}
