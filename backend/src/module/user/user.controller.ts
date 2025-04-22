import { BadGatewayException, Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from 'src/dto/createUserDTO';
import { LoginDTO } from 'src/dto/loginDTO';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('/get-all')
    async getAllUsers() {
        return await this.userService.getAllUsers();
    }

    @Post('/create')
    async createUser(@Body(new ValidationPipe()) user: CreateUserDTO) {
        try {
            return await this.userService.createUser(user);
        } catch (error) {
            return new BadGatewayException(error.message);
        }
    }

    @Post('/login')
    async loginUser(@Body(new ValidationPipe()) user: LoginDTO) {
        try {
            return await this.userService.loginUser(user);
        } catch (error) {
            return new BadGatewayException(error.message);
        }
    }
}
