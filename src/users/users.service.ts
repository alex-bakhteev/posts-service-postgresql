import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {
    async ban(dto: BanUserDto) {
        const user = this.userRepository.findByPk(dto.userId);
        if (!user) {
            throw new HttpException('Пользователь не найден!', HttpStatus.NOT_FOUND)
        }
        (await user).banned = true;
        (await user).banReason = dto.banReason;
        (await user).save;
        return user
    }
    constructor(@InjectModel(User) private userRepository: typeof User, private roleService: RolesService) { }
    async createUser(dto: createUserDto) {
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue("ADMIN");
        await user.$set('roles', [role.id])
        user.roles = [role]
        return user;
    }
    async getAllUsers() {
        const users = await this.userRepository.findAll({ include: { all: true } });
        return users;
    }
    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email }, include: { all: true } })
        return user;
    }
    async addRole(dto: AddRoleDto) {
        const user = this.userRepository.findByPk(dto.userId)
        const role = this.roleService.getRoleByValue(dto.value)
        if (role && user) {
            (await user).$add('role', (await role).id)
            return dto
        }
        throw new HttpException('Отсутсвует пользователь или роль!', HttpStatus.NOT_FOUND)
    }
}
