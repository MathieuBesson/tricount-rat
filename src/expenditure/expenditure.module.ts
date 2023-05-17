import { Module } from '@nestjs/common';
import { ExpenditureController } from './expenditure.controller';

@Module({
  controllers: [ExpenditureController]
})
export class ExpenditureModule {}
