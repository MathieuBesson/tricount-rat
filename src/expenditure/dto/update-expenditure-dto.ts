import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsInt, IsNotEmpty, IsNumber, IsPositive } from "class-validator"

export class UpdateExpenditureDto {
    @ApiProperty({ required: false })
    @IsDate()
    @IsNotEmpty()
    readonly date?: Date

    @ApiProperty({ required: false })
    @IsPositive()
    @IsNumber()
    readonly amount?: number

    @ApiProperty({ required: false })
    @IsInt()
    @IsPositive()
    readonly userId?: number

    @ApiProperty({ required: false })
    @IsInt()
    @IsPositive()
    readonly expenditureCategoryId?: number
}