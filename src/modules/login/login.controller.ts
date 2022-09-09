import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
    public constructor(private readonly loginService: LoginService) {}

    @Post()
    public login(
        @Body('document') document: string,
        @Body('password') password: number,
    ) {
        return this.loginService.login(document, password);
    }
}
