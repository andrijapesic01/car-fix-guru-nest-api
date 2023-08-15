/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Car, PrismaClient } from '@prisma/client';
import { CreateModCarDto } from 'src/dtos/car/create-mod-car.dto';

const prisma = new PrismaClient();

@Injectable()
export class CarsService {
  public getCars(): Promise<Car[]> {
    return prisma.car.findMany();
  }

  public async getCar(id: string): Promise<Car | null> {
    return await prisma.car.findUnique({
      where: {
        id: id,
      },
    });
  }

  public async createCar( carData: CreateModCarDto ) : Promise<Car | BadRequestException> {
    const car = await prisma.car.create({
      data: {
        brand: carData.brand,
        model: carData.model,
        generation: carData.generation,
        category: carData.category,
        yearFrom: carData.yearFrom,
        yearTo: carData.yearTo,
        engines: {
          connect: carData.engineIDs.map((engineId) => ({ id: engineId })),
        },
        transmissions: {
          connect: carData.transmissionIDs.map((transmissionId) => ({
            id: transmissionId,
          })),
        },
      },
    });
    return car;
  }

  public async changeCar(id: string, carData: CreateModCarDto ): Promise<Car | BadRequestException> {
    try {
      const car = await prisma.car.update({
        where: { id: id },
        data: {
          brand: carData.brand,
          model: carData.model,
          generation: carData.generation,
          category: carData.category,
          yearFrom: carData.yearFrom,
          yearTo: carData.yearTo,
          engines: {
            connect: carData.engineIDs.map((engineId) => ({ id: engineId })),
          },
          transmissions: {
            connect: carData.transmissionIDs.map((transmissionId) => ({
              id: transmissionId,
            })),
          },
        },
      });

      return car;
    } catch (error) {
      return new BadRequestException('Car does not exist');
    }
  }

  public async deleteCar(id: string): Promise<Car | NotFoundException> {
    try {
      const car = await prisma.car.delete({
        where: { id: id },
      });
      return car;
    } catch (error) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }
  }
}
