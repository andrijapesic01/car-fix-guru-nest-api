import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateModOrderDto } from 'src/dtos/order/order.dto';
import { Order } from '@prisma/client';

@Controller('orders')
export class OrderController {
    constructor(private orderService: OrderService) {

    }

    @Get('userOrder')
    getUserOrders() : Promise<Order[]> {
        const userId = "";
        return this.orderService.getUserOrders(userId);    
    }

    @Post('createOrder')
    createOrder(@Body() createModOrderDto: CreateModOrderDto) {
        this.orderService.createOrder(createModOrderDto);
    }
}
