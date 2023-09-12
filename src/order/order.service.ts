import { BadRequestException, Injectable } from '@nestjs/common';
import { Order, PrismaClient } from '@prisma/client';
import { CreateModOrderDto } from 'src/dtos/order/order.dto';

const prisma = new PrismaClient();

@Injectable()
export class OrderService {

    constructor() {

    }

    async getUserOrders(userId: string) : Promise<Order[] | null> {
        
        const user = await prisma.user.findUnique({ where: {
                id: userId
            }, include : {
                orders: true
            }
        });
        if(user) 
            return user.orders
        return null;
    }

    async createOrder(data: CreateModOrderDto) {
        return await prisma.order.create({data});
    }
    
}
