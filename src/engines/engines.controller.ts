import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EnginesService } from './engines.service';
import { CreateEngineDto } from 'src/dtos/engine/create-engine.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';

@UseGuards(JwtAuthGuard)
@Controller('engines')
@ApiTags('engines')
export class EnginesController {
  constructor(private enginesService: EnginesService) {}

  @Public()
  @Get()
  public getEngines() {
    return this.enginesService.getEngines();
  }

  @Public()
  @Get(':id')
  public getEngine(@Param('id') id: string) {
    return this.enginesService.getEngine(id);
  }

  @Post('addEngine')
  public addEngine(@Body() createEngineDto: CreateEngineDto) {
    return this.enginesService.addEngine(createEngineDto);
  }

  @Put('changeEngine/:id')
  public changeEngine(@Param('id') id: string, @Body() createEngineDto: CreateEngineDto) {
    return this.enginesService.changeEngine(id, createEngineDto);
  }
  
  @Delete('deleteEngine/:id')
  public deleteEngine(@Param('id') id: string) {
    return this.enginesService.deleteEngine(id);
  }

}