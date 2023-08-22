import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { CreateUserDto } from 'src/dtos/user/create-user.dto';
import * as bcrypt from 'bcrypt';
import { HashingService } from 'src/auth/hashing/hashing.service';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {

  constructor (private hashingService: HashingService) {}

  public async getAllUsers() {
    return prisma.user.findMany();
  }

  public async getUser(id: string) {
    return prisma.user.findUnique({ where: { id: id }});
  }

  public async findUserByEmail(email: string) : Promise<User | null> {
    return prisma.user.findUnique({ where: { email: email}}); 
  }

  public async createUser(createUserDto: CreateUserDto): Promise<User | BadRequestException> {

    const user = prisma.user.findUnique({ where: { email: createUserDto.email}}); 
    //const user = this.findUserByEmail(createUserDto.email);
    /* console.log(user); 
    if(user != null)
      return new BadRequestException('User already exist') */;

    //const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const hashedPassword = await this.hashingService.hash(createUserDto.password);

    return prisma.user.create({
      data: {
        email: createUserDto.email,
        password: hashedPassword,
        fname: createUserDto.fname,
        lname: createUserDto.lname,
        address: createUserDto.address,
        cityAndState: createUserDto.cityAndState,
        phoneNumber: createUserDto.phoneNumber,
      },
    });
  }

  public removeUser(id: string) {
    const user = prisma.user.delete({where: { id: id}});
    return user;
  }

}