import { BadRequestException, Injectable, UseGuards } from '@nestjs/common';
import { Part, Prisma, PrismaClient } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateModPartDto } from 'src/dtos/part/create-mod-part.dto';

const prisma = new PrismaClient();

@UseGuards(JwtAuthGuard)
@Injectable()
export class PartsService {

    public getParts(): Promise<Part[]> {
        return prisma.part.findMany();
    }

    public async getPart(id: string): Promise<Part | null> {
        return prisma.part.findUnique({
            where: {
                id: id
            }
        })
    }

    public async addPart(partData: CreateModPartDto): Promise<Part> {
        try {
            const part = prisma.part.create({
                data: {
                    name: partData.name,
                    manufacturer: partData.manufacturer,
                    category: partData.category,
                    subCategory: partData.subCategory,
                    referenceNumber: partData.referenceNumber,
                    imgURLs: partData.imgURLs,
                    compatibleCars: { connect: partData.carIDs.map(carId => ({ id: carId })) },
                    compatibleEngines: { connect: partData.engineIDs.map(engineId => ({ id: engineId })) },
                    price: partData.price,
                    quantity: partData.quantity
                }
            });
            return part;
        } catch (error) {
            console.log(error);
            throw new BadRequestException("Error creating part!");
        }
    }

    public async changePart(id: string, partData: CreateModPartDto): Promise<Part> {
        try {
            const part = prisma.part.update({
                where: { id: id },
                data: {
                    name: partData.name,
                    manufacturer: partData.manufacturer,
                    category: partData.category,
                    subCategory: partData.subCategory,
                    referenceNumber: partData.referenceNumber,
                    imgURLs: partData.imgURLs,
                    compatibleCars: { connect: partData.carIDs.map(carId => ({ id: carId })) },
                    compatibleEngines: { connect: partData.engineIDs.map(engineId => ({ id: engineId })) },
                    //compatibleTransmissions: { connect: partData.transmissionIDs.map(transId => ({id: transId}))},
                    price: partData.price,
                    quantity: partData.quantity
                }
            });
            return part;
        } catch (error) {
            throw new BadRequestException(`Could not update part with ID ${id}`);
        }
    }

    public deletePart(id: string) {
        return prisma.part.delete({ where: { id: id } });
    }

    public async getCertainNumParts(numOfParts: number): Promise<Part[]> {
        const partsCount = await prisma.part.count();
        if (partsCount > numOfParts) {
            return await prisma.part.findMany({
                take: numOfParts,
            });
        }
        return await prisma.part.findMany();
    }

    public async getPartManufacturers(): Promise<string[]> {
        const distinctManufacturers = await prisma.part.findMany({
            distinct: ['manufacturer'],
            select: { manufacturer: true },
        });
        const manufacturers = distinctManufacturers.map((part) => part.manufacturer);
        manufacturers.sort();
        return manufacturers;
    }

    public async filterPartsCategoryCar(carId: string, engineId: string, category: string, subCategory: string)
        : Promise<Part[]> {
        if (carId === "0" && engineId === "0" && category === "0" && subCategory === "0") {
            return [];
        }

        const baseQuery: Prisma.PartFindManyArgs = {
            where: {},
        };

        if (carId !== '0') {
            const car = prisma.car.findUnique({ where: { id: carId } });
            if (car) {
                baseQuery.where.compatibleCars = { some: { id: carId } };
            }
        }

        if (engineId !== '0') {
            const engine = prisma.car.findUnique({ where: { id: engineId } });
            if (engine) {
                baseQuery.where.compatibleEngines = { some: { id: engineId } };
            }
        }

        if (category !== '0') {
            baseQuery.where.category = category;
        }

        if (subCategory !== '0') {
            baseQuery.where.subCategory = subCategory;
        }

        return await prisma.part.findMany(baseQuery);
    }

    filterPartsByString(query: string): Promise<Part[]> {
        return prisma.part.findMany({
            where: {
                OR: [
                    { name: { contains: query } },
                    { manufacturer: { contains: query } },
                    { category: { contains: query } },
                    { subCategory: { contains: query } },
                    { referenceNumber: { contains: query } }, ,
                ],
            },
        });
    }

}