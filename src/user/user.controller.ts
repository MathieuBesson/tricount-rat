import { Body, ConflictException, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { ConfirmationActionMessage } from 'src/helpers/root-service';

@Controller('user')
export class UserController {
    public constructor(private readonly userService: UserService) { }

    @Get()
    public readAll() {
        return this.userService.readAll()
    }

    @Get(':id')
    public readOne(@Param('id', ParseIntPipe) userId: number) {
        return this.userService.readOne(userId)
    }

    @Post()
    public async create(@Body() createUserDto: CreateUserDto): Promise<ConfirmationActionMessage> {
        return await this.userService.create(createUserDto)
    }

    @Patch(':id')
    public async patch(@Param('id', ParseIntPipe) userId: number, @Body() updateUserDto: UpdateUserDto): Promise<ConfirmationActionMessage> {
        return await this.userService.update(userId, updateUserDto)
    }

    @Delete(':id')
    public async delete(@Param('id', ParseIntPipe) userId: number): Promise<ConfirmationActionMessage> {
        return await this.userService.delete(userId)
    }
}
