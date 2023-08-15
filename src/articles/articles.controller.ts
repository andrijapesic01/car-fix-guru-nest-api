import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateModArticleDto } from 'src/dtos/article/create-mod-article.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @Get()
  public getParts() {
    return this.articlesService.getArticles();
  }

  @Get(':id')
  public getPart(@Param('id') id: string) {
    return this.articlesService.getArticle(id);
  }

  @Post('addArticle')
  public addPart(@Body() article: CreateModArticleDto) {
    return this.articlesService.addArticle(article);
  }

  @Put('changeArticle/:id')
  public changePart(@Param('id') id: string, @Body() data: CreateModArticleDto) {
    return this.articlesService.changeArticle(id, data);
  }

  @Delete('deleteArticle/:id')
  public deletePart(@Param('id') id: string) {
    return this.articlesService.deleteArticle(id);
  }

}
