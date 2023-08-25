import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PartsService } from './parts.service';
import { CreateModPartDto } from 'src/dtos/part/create-mod-part.dto';
import { Public } from 'src/auth/decorators/public.decorator'


@Controller('parts')
@ApiTags('parts')
export class PartsController {
    constructor(private partsService: PartsService) {}
  
    @Public()
    @Get()
    public getParts() {
      return this.partsService.getParts();
    }
  
    @Get(':id')
    public getPart(@Param('id') id: string) {
      return this.partsService.getPart(id);
    }
  
    @Post('addPart')
    public addPart(@Body() carData: CreateModPartDto) {
      return this.partsService.addPart(carData);
    }
  
    @Put('changePart/:id')
    public changePart(@Param('id') id: string, @Body() data: CreateModPartDto) {
      return this.partsService.changePart(id, data);
    }
  
    @Delete('deletePart/:id')
    public deletePart(@Param('id') id: string) {
      return this.partsService.deletePart(id);
    }
  
  }
