import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity implements User {
    @ApiProperty()
    id: number;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    email: string;
}