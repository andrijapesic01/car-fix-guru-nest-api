/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateModArticleDto {

    @IsString()
    @IsNotEmpty()
    carId: string;

    @IsString()
    @IsNotEmpty()
    headline: string;

    @IsString()
    description: string;
    
    @IsString()
    text: string;
    
    @IsString()
    imgURLs: string[];

    @IsString()
    tools: string;

    @IsString()
    parts: string;

    @IsString()
    tags: string;

    @IsString()
    userId: string;
}