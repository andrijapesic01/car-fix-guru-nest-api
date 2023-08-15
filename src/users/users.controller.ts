import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dtos/user/create-user.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
    constructor(private usersService: UsersService) {}
  
    @Post()
    public create(@Body() createUserDto: CreateUserDto) {
      return this.usersService.createUser(createUserDto);
    }
  
    @Get()
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
  
    @Delete('removeUser/:id')
    remove(@Param('id') id: string) {
      return this.usersService.removeUser(id);
    }
  
  }
