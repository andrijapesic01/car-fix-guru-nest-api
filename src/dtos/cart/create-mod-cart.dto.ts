import { IsString, IsNotEmpty } from 'class-validator';

export class CreateModCartDto {
    @IsString()
    @IsNotEmpty()
    carId: string;

    @IsString()
    @IsNotEmpty()
    headline: string;

    @IsString()
    paragraphs: string[];

    @IsString()
    imgURLs: string[];
}