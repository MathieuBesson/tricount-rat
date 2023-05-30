import { ConflictException, Injectable } from '@nestjs/common';
import { ConfirmationActionMessage, RootService } from 'src/helpers/root-service';
import { CreateExpenditureCategoryDto } from './dto/create-expenditure-category-dto';
import { UpdateExpenditureCategoryDto } from './dto/update-expenditure-category-dto';

@Injectable()
export class ExpenditureCategoryService extends RootService {
    public giveEntityName(): string {
        return "expenditureCategory"
    }

    public async create(createExpenditureCategoryDto: CreateExpenditureCategoryDto) {
        const { name } = createExpenditureCategoryDto;
        // Check if user exist
        const numberOfExpenditureCategoryWithSameName = await this.prismaService.expenditureCategory.count({ where: { name } })
        if (numberOfExpenditureCategoryWithSameName > 0) {
            throw new ConflictException(`${this.getEntityNameCapitalized()} with this name already exist`)
        }
        // Create user in BDD
        return await this.prismaService.expenditureCategory.create({ data: { name } })
    }

    public async update(id: number, updateExpenditureCategoryDto: UpdateExpenditureCategoryDto) {
        this.verifyEntityExist(id);

        // Check duplicated email
        const numberOfExpenditureCategoryWithSameName = await this.prismaService.expenditureCategory.count({
            where: {
                name: updateExpenditureCategoryDto.name,
                id: { not: id }
            }
        })
        if (numberOfExpenditureCategoryWithSameName > 0) {
            throw new ConflictException(`${this.getEntityNameCapitalized()} with this name already exist`)
        }

        // Update expenditure category
        return await this.prismaService.expenditureCategory.update({ where: { id }, data: { ...updateExpenditureCategoryDto } })
    }
}
