import { Decimal } from '@prisma/client/runtime/library';
import { IsString, IsDecimal, IsNotEmpty, IsInt } from 'class-validator';


export class CreateModPartDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    manufacturer: string;

    @IsString()
    @IsNotEmpty()
    category: string;

    @IsString()
    @IsNotEmpty()
    subCategory: string;

    @IsString()
    @IsNotEmpty()
    referenceNumber: string;

    @IsString()
    imgURLs: string[];

    @IsString()
    carIDs: string[];

    @IsString()
    transmissionIDs: string[];

    @IsString()
    engineIDs: string[];

    @IsDecimal()
    @IsNotEmpty()
    price: Decimal;

    @IsNotEmpty()
    quantity: number;
}