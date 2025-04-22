import { IsEmail } from "class-validator";

export class LoginDTO {
    email: string;
    password: string;
}