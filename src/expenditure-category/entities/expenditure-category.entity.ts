import { ExpenditureCategory } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ExpenditureCategoryEntity implements ExpenditureCategory {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;
}