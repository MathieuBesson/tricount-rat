import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ExpenditureService } from './expenditure.service';
import { ConfirmationActionMessage } from 'src/helpers/root-service';
import { CreateExpenditureDto } from './dto/create-expenditure-dto';
import { UpdateExpenditureDto } from './dto/update-expenditure-dto';
import { ApiCreatedResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ExpenditureEntity } from './entities/expenditure.entity';
import { UserExpendituresSum } from 'src/user/entities/user-expenditures-sum';

@Controller('expenditures')
@ApiTags('expenditures')
export class ExpenditureController {
    public constructor(private readonly expenditureService: ExpenditureService) { }

    @Get()
    @ApiOkResponse({ type: ExpenditureEntity, isArray: true })
    @ApiQuery({ name: 'fieldToOrder', required: false, type: String })
    @ApiQuery({ name: 'orderType', required: false, type: String })
    public readAll(
        @Query('fieldToOrder') fieldToOrder: string,
        @Query('orderType') orderType: string,
    ) {
        if (fieldToOrder && orderType) {
            return this.expenditureService.readAllByField(fieldToOrder, orderType)
        }

        return this.expenditureService.readAll()
    }

    @Get('/user')
    @ApiOkResponse({ type: UserExpendituresSum, isArray: true })
    public readAllByUser() {
        return this.expenditureService.readAllByUser()
    }

    @Get(':id')
    @ApiOkResponse({ type: ExpenditureEntity })
    public readOne(@Param('id', ParseIntPipe) expenditureId: number) {
        return this.expenditureService.readOne(expenditureId)
    }

    @Post()
    @ApiCreatedResponse({ type: ExpenditureEntity })
    public async create(@Body() createExpenditureDto: CreateExpenditureDto) {
        return await this.expenditureService.create(createExpenditureDto)
    }

    @Patch(':id')
    @ApiOkResponse({ type: ExpenditureEntity })
    public async update(@Param('id', ParseIntPipe) expenditureId: number, @Body() updateExpenditureDto: UpdateExpenditureDto) {
        return await this.expenditureService.update(expenditureId, updateExpenditureDto)
    }

    @Delete(':id')
    @ApiOkResponse({ type: ExpenditureEntity })
    public async delete(@Param('id', ParseIntPipe) expenditureId: number) {
        return await this.expenditureService.delete(expenditureId)
    }
}
