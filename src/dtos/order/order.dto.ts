import { OrderItem } from "@prisma/client";

export class CreateModOrderDto {
    userId: string;
    orderedItems: OrderItem[];    
}