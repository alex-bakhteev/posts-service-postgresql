import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, HasMany, Model } from "sequelize-typescript";
import { Column, DataType, Table } from "sequelize-typescript";
import { Post } from "src/posts/posts.model";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface UserCreationAttrs {
    email: string;
    password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;
    @ApiProperty({ example: 'user@email.ru', description: 'Адрес электронной почты' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;
    @ApiProperty({ example: '123', description: 'Пароль' })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;
    @ApiProperty({ example: 'true', description: 'Статус блокировки' })
    @Column({ type: DataType.STRING, defaultValue: false })
    banned: boolean;
    @ApiProperty({ example: 'Нарушение правил', description: 'Причина блокировки' })
    @Column({ type: DataType.STRING, allowNull: true })
    banReason: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];

    @HasMany(() => Post)
    post: Post[]
}