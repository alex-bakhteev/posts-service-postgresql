import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class createUserDto {
    @ApiProperty({ example: 'user@email.ru', description: 'Адрес электронной почты' })
    @IsString({ message: 'Должно быть строкой' })
    @IsEmail({}, { message: 'Неверный формат ввода электронной почты!' })
    readonly email: string;
    @ApiProperty({ example: '123', description: 'Пароль' })
    @IsString({ message: 'Должно быть строкой' })
    @Length(4, 16, { message: 'Пароль должен содержать от 4 до 16 символов!' })
    readonly password: string;
}