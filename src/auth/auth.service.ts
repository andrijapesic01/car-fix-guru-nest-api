import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { HashingService } from './hashing/hashing.service';
import { JwtService } from '@nestjs/jwt';

const prisma = new PrismaClient();

@Injectable()
export class AuthService {
    
    constructor(private hashingService: HashingService, private jwtService: JwtService) {}

    async validateUser(email: string, password: string) : Promise<any> {
        const user = await prisma.user.findUnique({ where: { email: email } });

        if(user && (await this.hashingService.compare(password, user.password))) {
            const { password, ...rest} = user;
            return rest;
        }

        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id, role: user.role};

        const retUser = { ...user};
        return {
            //...user,
            user: retUser, 
            accessToken: this.jwtService.sign(payload)
        };
    }
}
