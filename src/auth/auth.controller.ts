import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import {CreateUserDto} from '../user/dto/create-User.dto'
import { LocalAuthGuard } from 'src/common/local-auth.guard';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
    ) {}

    @Post('/login')
    @UseGuards(LocalAuthGuard)
    async authUser(@Body() CreateUserDto : CreateUserDto)
    {
      return this.authService.validateUser(CreateUserDto)
    }

    
    @Post('/registration')
 
    async regUser(@Body() CreateUserDto : CreateUserDto)
    {
   return   this.authService.registration(CreateUserDto)
    }
}
