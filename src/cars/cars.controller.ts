import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateModCarDto } from 'src/dtos/car/create-mod-car.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('cars')
@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Get()
  public getCars() {
    return this.carsService.getCars();
  }

  @Get(':id')
  public getCar(@Param('id') id: string) {
    return this.carsService.getCar(id);
  }

  @Post('addCar')
  public addCar(@Body() carData: CreateModCarDto) {
    return this.carsService.createCar(carData);
  }

  @Put('changeCar/:id')
  public changeCar(@Param('id') id: string, @Body() carData: CreateModCarDto) {
    return this.carsService.changeCar(id, carData);
  }

  @Delete('deleteCar/:id')
  public deleteCar(@Param('id') id: string) {
    return this.carsService.deleteCar(id);
  }
}
