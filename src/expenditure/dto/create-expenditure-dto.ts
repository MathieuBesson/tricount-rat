import { IsDate } from "class-validator";
import { IsInt } from "class-validator";
import { IsNumber } from "class-validator";
import { IsPositive } from "class-validator";
import { IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateExpenditureDto {
    @ApiProperty()
    @IsDate()
    @IsNotEmpty()
    readonly date: Date

    @ApiProperty()
    @IsPositive()
    @IsNumber()
    readonly amount: number
  
    @ApiProperty()
    @IsInt()
    @IsPositive()
    readonly userId: number
    
    @ApiProperty()
    @IsInt()
    @IsPositive()
    readonly expenditureCategoryId: number
}