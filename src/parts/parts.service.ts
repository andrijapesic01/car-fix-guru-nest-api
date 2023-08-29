import { BadRequestException, Injectable } from '@nestjs/common';
import { Part, PrismaClient } from '@prisma/client';
import { CreateModPartDto } from 'src/dtos/part/create-mod-part.dto';

const prisma = new PrismaClient();

@Injectable()
export class PartsService {
    
    public getParts() : Promise<Part[]> {
        return prisma.part.findMany();
    }

    public async getPart(id: string) : Promise<Part | null> {
        return prisma.part.findUnique({ where: {
            id: id
        }})
    }

    public async addPart(partData: CreateModPartDto) : Promise<Part | BadRequestException> {
        try {
            const part = prisma.part.create({
                data: {
                    name: partData.name,
                    manufacturer: partData.manufacturer,
                    category: partData.category,
                    subCategory: partData.subCategory,
                    referenceNumber: partData.referenceNumber,
                    imgURLs: partData.imgURLs,
                    compatibleCars: { connect: partData.carIDs.map(carId => ({id: carId}))},
                    compatibleEngines: { connect: partData.engineIDs.map(engineId => ({id: engineId}))},
                    compatibleTransmissions: { connect: partData.transmissionIDs.map(transId => ({id: transId}))},
                    price: partData.price,
                    quantity: partData.quantity
                }
            });
            console.log(part);
            return part;
        } catch(error) {
            throw new BadRequestException("Error creating part!");
        }
    }

    public async changePart(id: string, partData: CreateModPartDto) : Promise<Part | BadRequestException> {
        try {
            const part = prisma.part.update({
                where: {id: id},
                data: {
                    name: partData.name,
                    manufacturer: partData.manufacturer,
                    category: partData.category,
                    subCategory: partData.subCategory,
                    referenceNumber: partData.referenceNumber,
                    imgURLs: partData.imgURLs,
                    compatibleCars: { connect: partData.carIDs.map(carId => ({id: carId}))},
                    compatibleEngines: { connect: partData.engineIDs.map(engineId => ({id: engineId}))},
                    compatibleTransmissions: { connect: partData.transmissionIDs.map(transId => ({id: transId}))},
                    price: partData.price,
                    quantity: partData.quantity
                }
            });
            return part;
        } catch(error) {
            throw new BadRequestException(`Could not update part with ID ${id}`);
        }
    }

    public deletePart(id: string) {
        return prisma.part.delete({where: { id: id}});
    }

}