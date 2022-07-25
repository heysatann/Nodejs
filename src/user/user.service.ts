import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import {bcrypt} from 'bcrypt'
import { RoleService } from 'src/role/role.service';
import { RolesEnums } from 'src/common/enums/roles.enums';
import { RoleEntity } from 'src/role/entities/role.entity';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
      private readonly users: Repository<UserEntity>,
      private readonly role: RoleService
      ) {}

async createUser(createUserDto: CreateUserDto)
{
  const user = await this.users.create(createUserDto)

    
    const roles = await this.role.getRoleByValue(RolesEnums.CLIENT)
    user.roles = [roles]
    return this.users.save(user)

}

    async getUserbyEmail(email : string)
    {
      const user = this.users.findOne({where:{
        email:email
      }})
      return user;
    }


    async findByParam(params : IFindParams)
    {
        const { password, email } = params;
        return this.users.findOne({
            where: {
              email: email,
              password: await this.hashPassword(password),
            },
          });
    }

    async hashPassword(password:string) {
        const salt = await bcrypt.genSalt();
        return  await bcrypt.hash(password, salt);
      }
    
  }



declare interface IFindParams {
  email: string;
  password: string;
}
