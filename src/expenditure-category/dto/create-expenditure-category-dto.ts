import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength } from "class-validator";
import { IsNotEmpty } from "class-validator";

export class CreateExpenditureCategoryDto {

    @ApiProperty()
    @MaxLength(100)
    @IsNotEmpty()
    @IsString()
    readonly name: string
}