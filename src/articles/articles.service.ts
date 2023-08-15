import { BadRequestException, Injectable } from '@nestjs/common';
import { Article, PrismaClient } from '@prisma/client';
import { CreateModArticleDto } from 'src/dtos/article/create-mod-article.dto';

const prisma = new PrismaClient();

@Injectable()
export class ArticlesService {
    public getArticles() : Promise<Article[]> {
        return prisma.article.findMany();
    }

    public async getArticle(id: string) : Promise<Article | null> {
        return await prisma.article.findUnique({ where: {
            id: id
        }})
    }

    public async addArticle(articleData: CreateModArticleDto) : Promise<Article | BadRequestException> {
        try {
            const article = prisma.article.create({
                data: articleData
            });
            return article;
        } catch(error) {
            throw new BadRequestException("Error creating part!");
        }
    }

    public async changeArticle(id: string, data: CreateModArticleDto) : Promise<Article | BadRequestException> {
        try {
            const article = prisma.article.update({
                where: {id: id},
                data: data
            });
            return article;
        } catch(error) {
            throw new BadRequestException(`Could not update part with ID ${id}`);
        }
    }

    public deleteArticle(id: string) {
        return prisma.article.delete({where: { id: id}});
    }
}
