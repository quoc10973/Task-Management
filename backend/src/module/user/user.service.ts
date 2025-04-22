import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

    async createUser(user: User): Promise<User> {
        return await this.userRepository.save(user);
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
}
