import { Expenditure } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ExpenditureEntity implements Expenditure {
    @ApiProperty()
    id: number;

    @ApiProperty()
    date: Date;

    @ApiProperty()
    amount: number;
    
    @ApiProperty()
    userId: number;
    
    @ApiProperty()
    expenditureCategoryId: number;
}