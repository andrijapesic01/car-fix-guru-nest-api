import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateModArticleDto } from 'src/dtos/article/create-mod-article.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';


@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  /* @UseGuards(JwtAuthGuard) */
  @Get()
  public getArticles() {
    return this.articlesService.getArticles();
  }

  @Get(':id')
  public getArticle(@Param('id') id: string) {
    return this.articlesService.getArticle(id);
  }

  @Post('addArticle')
  public addArticle(@Body() article: CreateModArticleDto) {
    return this.articlesService.addArticle(article);
  }

  @Put('changeArticle/:id')
  public changeArticle(@Param('id') id: string, @Body() data: CreateModArticleDto) {
    return this.articlesService.changeArticle(id, data);
  }

  @Delete('deleteArticle/:id')
  public deleteArticle(@Param('id') id: string) {
    return this.articlesService.deleteArticle(id);
  }

}
