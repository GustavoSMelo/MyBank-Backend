import {
    Body,
    Controller,
    Get,
    Headers,
    Param,
    Post,
    UnauthorizedException,
    UseGuards,
} from '@nestjs/common';
import { JWTGuards } from '../auth/guards/jwt.guards';
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
    @UseGuards(JWTGuards)
    public index() {
        return this.userService.index();
    }

    @Get(':id')
    @UseGuards(JWTGuards)
    public show(@Param('id') id: number, @Headers('userid') userid: number) {
        if (userid !== id) throw new UnauthorizedException('Unauthorized');

        return this.userService.show(id);
    }
}
