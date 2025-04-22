import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDTO {

    @IsString({ message: 'Name must be a string' })
    name: string;

    @IsEmail({}, { message: 'Email must be a valid email address' })
    email: string;

    @Length(8, 20, { message: 'Password must be between 8 and 20 characters' })
    password: string;
}