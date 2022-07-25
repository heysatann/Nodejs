import { UserEntity } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, TableForeignKey, JoinTable } from 'typeorm';
import { ForeignKeyMetadata } from 'typeorm/metadata/ForeignKeyMetadata';
import { RoleEntity } from './role.entity';

@Entity('user_roles')
export class UserRolesEntity {
    @PrimaryGeneratedColumn()
    id: number;

    
    @Column()
    roleid : number;
    @Column()
    userid: number;

    @ManyToMany(()=>RoleEntity)
    @JoinTable()
    role: RoleEntity[]
}
