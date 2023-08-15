import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, Transmission } from '@prisma/client';
import { CreateModTransmissionDto } from 'src/dtos/transmission/create-modify-transmission.dto';

const prisma = new PrismaClient();

@Injectable()
export class TransmissionsService {

    public getTransmissions() : Promise<Transmission[] | null> {
        return prisma.transmission.findMany();
    }
    
    public async getTransmission(id: string) : Promise<Transmission | null> {
        return prisma.transmission.findUnique({ where: {
            id: id
        }})
    }

    public async addTransmission(data: CreateModTransmissionDto) : Promise<Transmission | null> {
        try {
            console.log(data);
            const newTransmission = await prisma.transmission.create({
              data: data
            });
      
            return newTransmission;
        } catch (error) {
            console.error('Error adding transmission:', error);
            throw new Error('Failed to add transmission');
        }
    }

    public async changeTransmission(id: string, data: CreateModTransmissionDto) : Promise<Transmission | BadRequestException> {
        try {
            const transmission = await prisma.transmission.update({
                where: { id: id },
                data: data,
            });

            return transmission;
            
        }
        catch(error) {
            return new BadRequestException('Transmission does not exist');
        }
    }

    public async deleteTransmission(id: string): Promise<Transmission | NotFoundException> {
        try {
          const trans = await prisma.transmission.delete({
            where: { id: id },
          });
    
          return trans;
        } catch (error) {
          throw new NotFoundException(`Transmission with ID ${id} not found`);
        }
    }

}
