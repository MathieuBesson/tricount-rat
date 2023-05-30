import { Body, ConflictException, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { ConfirmationActionMessage } from 'src/helpers/root-service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UserController {
    public constructor(private readonly userService: UserService) { }

    @ApiOkResponse({ type: UserEntity, isArray: true })
    @Get()
    public readAll() {
        return this.userService.readAll()
    }

    @ApiOkResponse({ type: UserEntity })
    @Get(':id')
    public readOne(@Param('id', ParseIntPipe) userId: number) {
        return this.userService.readOne(userId)
    }

    @ApiCreatedResponse({ type: UserEntity })
    @Post()
    public async create(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto)
    }

    @ApiOkResponse({ type: UserEntity })
    @Patch(':id')
    public async update(@Param('id', ParseIntPipe) userId: number, @Body() updateUserDto: UpdateUserDto) {
        return await this.userService.update(userId, updateUserDto)
    }

    @ApiOkResponse({ type: UserEntity })
    @Delete(':id')
    public async delete(@Param('id', ParseIntPipe) userId: number) {
        return await this.userService.delete(userId)
    }
}
