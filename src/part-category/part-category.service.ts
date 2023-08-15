import { Injectable } from '@nestjs/common';
import { PartCategory, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
@Injectable()
export class PartCategoryService {
    public partCategories() : Promise<PartCategory[]> {
        return prisma.partCategory.findMany( {
            include: {
                subCategories: true
            } 
        });
    }
}
