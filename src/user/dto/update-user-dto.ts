import { MaxLength } from "class-validator";
import { IsNotEmpty } from "class-validator";

export class UpdateUserDto {
    @MaxLength(100)
    @IsNotEmpty()
    readonly firstName?: string

    @MaxLength(100)
    @IsNotEmpty()
    readonly lastName?: string

    @MaxLength(300)
    @IsNotEmpty()
    readonly email?: string
}