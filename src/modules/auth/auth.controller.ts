import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    public constructor(private readonly authService: AuthService) {}

    @Post('/login')
    public login(
        @Body('document') document: string,
        @Body('password') password: number,
    ) {
        return this.authService.login(document, password);
    }
}
