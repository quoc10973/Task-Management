import { IsEmail } from "class-validator";

export class LoginDTO {
    @IsEmail({}, { message: 'Invalid email' })
    email: string;
    password: string;
}