import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserExpendituresSum {
    @ApiProperty()
    _sum: {
        amount: number
    };

    @ApiProperty()
    userId: number;
}
