import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PartCategoryService } from './part-category.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('part-category')
@ApiTags('part-category')
export class PartCategoryController {
    constructor(private partCategoryService: PartCategoryService) {}

    @Get('partCategories')
    public allPartCategorys() {
        return this.partCategoryService.partCategories();
    }
}
