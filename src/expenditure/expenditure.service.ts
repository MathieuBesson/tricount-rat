import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfirmationActionMessage, RootService } from 'src/helpers/root-service';
import { CreateExpenditureDto } from './dto/create-expenditure-dto';
import { UpdateExpenditureDto } from './dto/update-expenditure-dto';

@Injectable()
export class ExpenditureService extends RootService {
    public giveEntityName(): string {
        return "expenditure"
    }

    public async readAllByUser() {
        // Fetch sum of all expenditure group bu userId
        return await this.prismaService.expenditure.groupBy({
            by: ["userId"],
            _sum: {
                amount: true
            }
        });
    }

    public async create(createExpenditureDto: CreateExpenditureDto) {
        const { userId, expenditureCategoryId } = createExpenditureDto;
        await this.verifyUserAndExpenditureCategoryExist(userId, expenditureCategoryId)

        // Seed Date from format send by client and call parent
        return super.create(this.seedDate(createExpenditureDto) as CreateExpenditureDto);
    }

    public async update(id: number, updateExpenditureDto: UpdateExpenditureDto) {
        const { userId, expenditureCategoryId } = updateExpenditureDto;
        await this.verifyUserAndExpenditureCategoryExist(userId, expenditureCategoryId)

        // Seed Date (if exist) from format send by client
        if (updateExpenditureDto.date !== null) {
            updateExpenditureDto = this.seedDate(updateExpenditureDto) as UpdateExpenditureDto
        }
        // Call parent
        return super.update(id, updateExpenditureDto);
    }

    private seedDate(expenditureDto: any): {
        date: Date;
        [key: string]: any;
    } {
        //  Seed date of object with real Date object
        expenditureDto = {
            ...expenditureDto,
            date: new Date(expenditureDto.date)
        }
        return expenditureDto;
    }

    public async verifyUserAndExpenditureCategoryExist(userId: number | null, expenditureCategoryId: number | null) {
        // Check user refer exist
        if (
            (userId !== undefined || userId !== null) &&
            (await this.isUserKnown(userId)) === false
        ) {
            throw new BadRequestException(`The field value of 'userId' refer user who not exist`);
        }

        // Check expenditureCategory refer exist
        if (
            (expenditureCategoryId !== undefined || expenditureCategoryId !== null) &&
            (await this.isExpenditureCategoryKnown(expenditureCategoryId)) === false
        ) {
            throw new BadRequestException(`The field value of 'expenditureCategoryId' refer expenditureCategory who not exist`);
        }
    }

    public async isUserKnown(userId: number): Promise<boolean> {
        return await this.prismaService.user.count({ where: { id: userId } }) > 0
    }

    public async isExpenditureCategoryKnown(expenditureCategoryId: number): Promise<boolean> {
        return await this.prismaService.expenditureCategory.count({ where: { id: expenditureCategoryId } }) > 0
    }
}
