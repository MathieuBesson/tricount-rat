import { Module } from '@nestjs/common';
import { ExpenditureCategoryController } from './expenditure-category.controller';

@Module({
  controllers: [ExpenditureCategoryController]
})
export class ExpenditureCategoryModule {}
