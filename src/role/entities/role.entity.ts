import { UserEntity } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { UserRolesEntity } from './user-roles.entity';

@Entity('role')
export class RoleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    role: string;

    @Column()
    description: string;

    @ManyToMany(()=> UserEntity, ()=> UserRolesEntity)
    @JoinTable()
    users: UserEntity[]
}
