import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import {CreateUserDto} from '../user/dto/create-User.dto';
import {JwtService} from '@nestjs/jwt'
import { UserEntity } from 'src/user/entities/user.entity';
@Injectable()
export class AuthService {
    constructor(
        private readonly users: UserService,
        private readonly jwtService: JwtService
      ) {}


      async validateUser(CreateUserDto : CreateUserDto) {
       const user=  this.users.findByParam({email : CreateUserDto.email , password: CreateUserDto.password})
  
        if (user) {
          return user;
        }
        if (!user) throw new UnauthorizedException('User not found');
      }

      async registration(CreateUserDto:CreateUserDto)
      {
        const candidate = await this.users.getUserbyEmail(CreateUserDto.email)
        if (candidate)
        throw new HttpException("User has been registred",HttpStatus.BAD_REQUEST)
        const user  = await this.users.createUser(CreateUserDto)
        return this.generateToken(user)
      }
      async generateToken(users: UserEntity)
      {
        const payload = {email:users.email, id: users.id, password: users.password, role: users.roles}
        return {
          token : this.jwtService.sign(payload)
        }
      }
}
