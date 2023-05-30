import { Module } from '@nestjs/common';
import { ExpenditureCategoryController } from './expenditure-category.controller';
import { ExpenditureCategoryService } from './expenditure-category.service';

@Module({
  controllers: [ExpenditureCategoryController],
  providers: [ExpenditureCategoryService],
})
export class ExpenditureCategoryModule { }
