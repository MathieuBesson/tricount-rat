import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MaxLength } from "class-validator";
import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @MaxLength(100)
    @IsNotEmpty()
    @IsString()
    readonly firstName: string

    @ApiProperty()
    @MaxLength(100)
    @IsNotEmpty()
    @IsString()
    readonly lastName: string

    @ApiProperty()
    @MaxLength(300)
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    readonly email: string
}