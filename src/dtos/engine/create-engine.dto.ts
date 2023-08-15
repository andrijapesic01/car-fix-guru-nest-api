import { fuelType } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { IsString, IsNumber, IsDecimal } from 'class-validator';

export class CreateEngineDto {
    
    @IsString()
    code: string;

    @IsString()
    configuration: string;

    @IsString()
    fuelType: fuelType;

    @IsDecimal()
    displacement: Decimal;

    @IsString()
    mark: string;

    @IsNumber()
    power: number;
}


