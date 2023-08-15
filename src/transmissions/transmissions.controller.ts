import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransmissionsService } from './transmissions.service';
import { CreateModTransmissionDto } from 'src/dtos/transmission/create-modify-transmission.dto';

@Controller('transmissions')
@ApiTags('transmissions')
export class TransmissionsController {
    constructor(private transmissionsService: TransmissionsService) {}
  
    @Get()
    public getTransmissions() {
      return this.transmissionsService.getTransmissions();
    }
  
    @Get(':id')
    public getTransmission(@Param('id') id: string) {
      return this.transmissionsService.getTransmission(id);
    }
  
    @Post('addTransmission')
    public addEngine(@Body() createTransmissionDto: CreateModTransmissionDto) {
      return this.transmissionsService.addTransmission(createTransmissionDto);
    }
  
    @Put('changeTransmission/:id')
    public changeTransmission(@Param('id') id: string, @Body() modifyTransmissionDto: CreateModTransmissionDto) {
      return this.transmissionsService.changeTransmission(id, modifyTransmissionDto);
    }
    
    @Delete('deleteTransmission/:id')
    public deleteTransmission(@Param('id') id: string) {
      return this.transmissionsService.deleteTransmission(id);
    }
  
  }
  
