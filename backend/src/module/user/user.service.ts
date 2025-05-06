import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from 'src/dto/createUserDTO';
import { plainToInstance } from 'class-transformer';
import { LoginDTO } from 'src/dto/loginDTO';
import { UserResponseDTO } from 'src/dto/userReponseDTO';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

    async createUser(user: CreateUserDTO): Promise<CreateUserDTO> {
        try {
            let isUserExist = await this.userRepository.findOne({ where: { email: user.email } });
            if (isUserExist) {
                throw new Error('User already exists');
            }
            const saltRounds = 10;
            const hashedPassword = await bcryptjs.hash(user.password, saltRounds);
            user.password = hashedPassword;
            const savedUser = await this.userRepository.save(user);
            return plainToInstance(User, savedUser);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async findUserById(id: number): Promise<User> {
        let user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    async findUserByEmail(email: string): Promise<User> {
        let user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async loginUser(loginUser: LoginDTO): Promise<UserResponseDTO> {
        let user = await this.userRepository.findOne({ where: { email: loginUser.email } });
        if (!user) {
            throw new Error('Invalid password');
        }
        const isPasswordValid = await bcryptjs.compare(loginUser.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        const userResponse = new UserResponseDTO();
        userResponse.id = user.id;
        userResponse.name = user.name;
        userResponse.email = user.email;
        userResponse.role = user.role;
        userResponse.createdAt = user.createdAt;
        userResponse.updatedAt = user.updatedAt;
        return userResponse;
    }
}
