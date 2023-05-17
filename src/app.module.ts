import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { ExpenditureService } from './expenditure/expenditure.service';
import { ExpenditureModule } from './expenditure/expenditure.module';
import { ExpenditureCategoryService } from './expenditure-category/expenditure-category.service';
import { ExpenditureCategoryModule } from './expenditure-category/expenditure-category.module';

@Module({
  imports: [PrismaModule, ConfigModule.forRoot({ isGlobal: true }), UserModule, ExpenditureModule, ExpenditureCategoryModule],
  providers: [PrismaService, UserService, ExpenditureService, ExpenditureCategoryService],
})
export class AppModule { }
