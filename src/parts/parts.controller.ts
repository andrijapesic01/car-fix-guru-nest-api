import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PartsService } from './parts.service';
import { CreateModPartDto } from 'src/dtos/part/create-mod-part.dto';
import { Public } from 'src/auth/decorators/public.decorator'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('parts')
@ApiTags('parts')
export class PartsController {
    constructor(private partsService: PartsService) {}
  
    @Public()
    @Get()
    public getParts() {
      return this.partsService.getParts();
    }

    @Public()
    @Get('getPartsManufacturers')
    public getPartsManufacturers() {
      return this.partsService.getPartManufacturers();
    }
  
    @Public()
    @Get(':id')
    public getPart(@Param('id') id: string) {
      return this.partsService.getPart(id);
    }
 
    @Public()
    @Get('getCertainNumParts/:numOfParts')
    public getCertainNumParts(@Param('numOfParts', ParseIntPipe) numOfParts: number) {
      return this.partsService.getCertainNumParts(numOfParts);
    }

    @Public()
    @Get('stringSearch/:searchString')
    public stringSearch(@Param('searchString') searchString: string) {
      return this.partsService.filterPartsByString(searchString);
    }
    
    @Public()
    @Get('getSpecificParts/:carId/:engineId/:category/:subCategory')
    public getFilteredParts(@Param('carId') carId: string, @Param('engineId') engineId: string,
      @Param('category') category: string, @Param('subCategory') subCategory: string) {
      return this.partsService.filterPartsCategoryCar(carId, engineId, category, subCategory);
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
