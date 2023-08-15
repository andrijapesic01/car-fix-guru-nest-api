import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PartCategoryService } from './part-category.service';

@Controller('part-category')
@ApiTags('part-category')
export class PartCategoryController {
    constructor(private partCategoryService: PartCategoryService) {}

    @Get('partCategories')
    public allPartCategorys() {
        return this.partCategoryService.partCategories();
    }
}
