import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsController } from './cars/cars.controller';
import { CarsService } from './cars/cars.service';
import { PartsController } from './parts/parts.controller';
import { PartsService } from './parts/parts.service';
import { EnginesService } from './engines/engines.service';
import { EnginesController } from './engines/engines.controller';
import { TransmissionsController } from './transmissions/transmissions.controller';
import { TransmissionsService } from './transmissions/transmissions.service';
import { ArticlesService } from './articles/articles.service';
import { ArticlesController } from './articles/articles.controller';
import { CartsController } from './carts/carts.controller';
import { CartsService } from './carts/carts.service';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { PartCategoryController } from './part-category/part-category.controller';
import { PartCategoryService } from './part-category/part-category.service';

@Module({
  imports: [],
  controllers: [AppController, CarsController, PartsController, EnginesController, TransmissionsController, ArticlesController, CartsController, UsersController, PartCategoryController],
  providers: [AppService, CarsService, PartsService, EnginesService, TransmissionsService, ArticlesService, CartsService, UsersService, PartCategoryService],
})
export class AppModule {}
