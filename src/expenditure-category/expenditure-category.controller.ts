import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { ExpenditureCategoryService } from './expenditure-category.service';
import { ConfirmationActionMessage } from 'src/helpers/root-service';
import { CreateExpenditureCategoryDto } from './dto/create-expenditure-category-dto';
import { UpdateExpenditureCategoryDto } from './dto/update-expenditure-category-dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ExpenditureCategoryEntity } from './entities/expenditure-category.entity';

@ApiTags('expenditure-categories')
@Controller('expenditure-categories')
export class ExpenditureCategoryController {
    public constructor(private readonly expenditureCategoryService: ExpenditureCategoryService) { }

    @Get()
    @ApiOkResponse({ type: ExpenditureCategoryEntity, isArray: true })
    public async readAll() {
        return await this.expenditureCategoryService.readAll()
    }

    @Get(':id')
    @ApiOkResponse({ type: ExpenditureCategoryEntity })
    public async readOne(@Param('id', ParseIntPipe) expenditureCategoryId: number) {
        return await this.expenditureCategoryService.readOne(expenditureCategoryId)
    }

    @Post()
    @ApiCreatedResponse({ type: ExpenditureCategoryEntity })
    public async create(@Body() createExpenditureCategoryDto: CreateExpenditureCategoryDto) {
        return await this.expenditureCategoryService.create(createExpenditureCategoryDto)
    }

    @Patch(':id')
    @ApiOkResponse({ type: ExpenditureCategoryEntity })
    public async update(@Param('id', ParseIntPipe) userId: number, @Body() updateExpenditureCategoryDto: UpdateExpenditureCategoryDto) {
        return await this.expenditureCategoryService.update(userId, updateExpenditureCategoryDto)
    }

    @Delete(':id')
    @ApiOkResponse({ type: ExpenditureCategoryEntity })
    public async delete(@Param('id', ParseIntPipe) expenditureCategoryId: number) {
        return await this.expenditureCategoryService.delete(expenditureCategoryId)
    }
}
