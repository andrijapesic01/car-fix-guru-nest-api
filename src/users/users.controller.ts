import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dtos/user/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from '@prisma/client';

@Controller('users')
@ApiTags('users')
export class UsersController {
    constructor(private usersService: UsersService) {}
  
    @Post('register')
    public create(@Body() createUserDto: CreateUserDto) {
      return this.usersService.createUser(createUserDto);
    }

    @Get('allUsers')
    public getAllUsers() {
      return this.usersService.getAllUsers();
    }
  
    @Get(':id')
    public getUser(@Param('id') id: string) {
      return this.usersService.getUser(id);
    }
  
    /* @Patch(':id')
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateUserDto: UpdateUserDto
    ) {
      return this.usersService.update(id, updateUserDto);
    } */
    
    @UseGuards(JwtAuthGuard)
    @Delete('removeUser/:id')
    remove(@Param('id') id: string) {
      return this.usersService.removeUser(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put('changePassword')
    changePassword(@Body() requestBody: any, @Request() req) : Promise<User> {
      const userId = req.user.id;
      return this.usersService.changeUserPassword(userId, requestBody.oldPassword, requestBody.newPassword);
    } 
  
  }
