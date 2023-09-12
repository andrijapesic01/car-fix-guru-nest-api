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

    public async addArticle(articleData: CreateModArticleDto): Promise<Article> {
        try {
            const article = await prisma.article.create({
                /* data: {
                    headline: articleData.headline,
                    description: articleData.description,
                    text: articleData.text,
                    imgURLs: articleData.imgURLs,
                    tools: articleData.tools,
                    parts: articleData.parts,
                    carId: articleData.carId,
                    userId: "clltr3vk00002va4wpqyki1bx"
                } */
                data: articleData
            });
            return article;
        } catch (error) {
            console.log(error);
            throw new BadRequestException('Error creating article!');
        }
    }

    public async changeArticle(id: string, data: CreateModArticleDto) : Promise<Article> {
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

    public articleStringSearch(searchString: string) : Promise<Article[]> {
        return prisma.article.findMany({
            where: {
                OR: [
                    { headline: { contains: searchString } },
                    { description: { contains: searchString } },
                    { text: { contains: searchString } },
                ],
              },
        })
    }
}
