import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from 'src/role/role.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports:[
    TypeOrmModule.forFeature([UserEntity]),
    RoleModule
  ],
  exports:[UserService]
})
export class UserModule {}
