import { carCategory } from "@prisma/client";
import { IsNumber, IsString } from "class-validator";

export class CreateModCarDto {

    @IsString()
    brand: string;

    @IsString()
    model: string;

    @IsString()
    generation: string;
    
    @IsString()
    category: carCategory;
    
    @IsNumber()
    yearFrom: number;
    
    @IsNumber()
    yearTo: number;

    @IsString()
    engineIDs: string[];
    
    @IsString()
    transmissionIDs: string[];

}