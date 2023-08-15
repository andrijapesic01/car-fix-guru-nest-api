import { IsNumber, IsString } from "class-validator";

export class CreateModTransmissionDto {

    @IsString()
    make: string;

    @IsString()
    model: string;

    @IsString()
    type: string;

    @IsNumber()
    numOfGears: number;
}