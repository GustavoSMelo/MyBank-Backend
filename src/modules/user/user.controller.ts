import { Body, Controller, Get, Post } from '@nestjs/common';
import { urlToHttpOptions } from 'url';
import { IUser } from './types/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    public constructor(private readonly userService: UserService) {}

    @Post()
    public save(@Body() user: IUser) {
        return this.userService.save(user);
    }

    @Get()
    public index() {
        return this.userService.index();
    }
}
