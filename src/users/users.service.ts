import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { CreateUserDto } from 'src/dtos/user/create-user.dto';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {

  public async getAllUsers() {
    return prisma.user.findMany();
  }

  public async getUser(id: string) {
    return prisma.user.findUnique({ where: { id: id }});
  }

  public async createUser(createUserDto: CreateUserDto): Promise<User | BadRequestException> {

  const user = prisma.user.findUnique({ where: { email: createUserDto.email}});  
  if(user != null)
    return new BadRequestException('User already exist');

  const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

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