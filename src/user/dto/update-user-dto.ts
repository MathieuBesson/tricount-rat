import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MaxLength } from "class-validator";
import { IsNotEmpty } from "class-validator";

export class UpdateUserDto {

    @ApiProperty({ required: false })
    @MaxLength(100)
    @IsNotEmpty()
    @IsString()
    readonly firstName?: string

    @ApiProperty({ required: false })
    @MaxLength(100)
    @IsNotEmpty()
    @IsString()
    readonly lastName?: string

    @ApiProperty({ required: false })
    @MaxLength(300)
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    readonly email?: string
}