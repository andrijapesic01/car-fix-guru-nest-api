import { Part } from "@prisma/client";

export interface CreateModOrderItem {
    part: Part;
    orderedQuantity: number;
}