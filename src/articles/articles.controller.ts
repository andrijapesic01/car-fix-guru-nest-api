import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateModArticleDto } from 'src/dtos/article/create-mod-article.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @Public()
  @Get()
  public getArticles() {
    return this.articlesService.getArticles();
  }

  @Public()
  @Get(':id')
  public getArticle(@Param('id') id: string) {
    return this.articlesService.getArticle(id);
  }

  //@Public()
  @Get('stringSearch/:searchString')
  public stringSearch(@Param('searchString') searchString: string) {
    return this.articlesService.articleStringSearch(searchString);
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
