import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { IUser } from './types/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    public constructor(private readonly userService: UserService) {}

    @Post()
    public save(
        @Body() user: IUser,
        @Headers('password') password: number,
        @Headers('fullPassword') fullPassword: number,
    ) {
        return this.userService.save(user, password, fullPassword);
    }

    @Get()
    public index() {
        return this.userService.index();
    }
}
