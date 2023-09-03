import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Engine, PrismaClient } from '@prisma/client';
import { CreateEngineDto } from 'src/dtos/engine/create-engine.dto';

const prisma = new PrismaClient();

@Injectable()
export class EnginesService {

    public async getEngines() : Promise<Engine[] | null> {
        const engines = await prisma.engine.findMany();
        return engines;
    }

    public async getEngine(id: string) : Promise<Engine | null> {
        return prisma.engine.findUnique({ where: {
            id: id
        }})
    }

    public async addEngine(data: CreateEngineDto) : Promise<Engine | null> {
        try {
            const newEngine = await prisma.engine.create({
              data: data
            });
      
            return newEngine;
        } catch (error) {
            console.error('Error adding engine:', error);
            throw new Error('Failed to add engine');
        }
    }

    public async changeEngine(id: string, data: CreateEngineDto) : Promise<Engine | BadRequestException> {
        try {
            const engine = await prisma.engine.update({
                where: { id: id },
                data: data,
            });

            return engine;
            
        }
        catch(error) {
            return new BadRequestException('Engine does not exist');
        }
    }

    public async deleteEngine(id: string): Promise<Engine | NotFoundException> {
        try {
          const engine = await prisma.engine.delete({
            where: { id: id },
          });
    
          return engine;
        } catch (error) {
          throw new NotFoundException(`Engine with ID ${id} not found`);
        }
    }

}
