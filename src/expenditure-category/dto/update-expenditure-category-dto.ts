import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, MaxLength } from "class-validator"

export class UpdateExpenditureCategoryDto {

    @ApiProperty({ required: false })
    @MaxLength(100)
    @IsNotEmpty()
    @IsString()
    readonly name: string
}