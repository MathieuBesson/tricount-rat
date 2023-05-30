import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import StringHelper from "./string-helper";

export type ConfirmationActionMessage = {
    message: string
}

@Injectable()
export abstract class RootService {
    private entityName: string;

    public constructor(protected readonly prismaService: PrismaService) {
        this.entityName = this.giveEntityName();
    }

    public abstract giveEntityName(): string;

    public async readAll() {
        // Fetch all entities of BDD
        return await this.prismaService[this.entityName].findMany();
    }

    public async readAllByField(field: string, order: string) {

        // Check if type of order exist
        if (!['asc', 'desc'].includes(order)) {
            throw new BadRequestException(`The filter type must be 'asc' or 'desc'`);
        }

        // Read all with order by constraint 
        return await this.prismaService[this.entityName].findMany({
            orderBy: [{ [field]: order }]
        });
    }

    public async readOne(id: number) {
        await this.verifyEntityExist(id);
        // Fertch entity of BDD by id
        return await this.prismaService[this.entityName].findUnique({ where: { id } })
    }

    public async create(createEntityDto: any) {
        // Create entity in BDD
        return await this.prismaService[this.entityName].create({ data: { ...createEntityDto } })
    }

    public async update(id: number, updateEntityDto: any) {
        await this.verifyEntityExist(id);
        // Update entity in BDD
        return await this.prismaService[this.entityName].update({ where: { id }, data: { ...updateEntityDto } })
    }

    public async delete(id: number) {
        await this.verifyEntityExist(id);
        // Delete entity in BDD
        return await this.prismaService[this.entityName].delete({ where: { id } })
    }

    protected async verifyEntityExist(id: number): Promise<void> {
        // Check if entity exist in BDD
        const entity = await this.prismaService[this.entityName].count({ where: { id } })
        if (!entity) {
            throw new NotFoundException(`This ${this.entityName} not exist`);
        }
    }

    public getEntityNameCapitalized(): string {
        return StringHelper.capitalize(this.entityName);
    }
}
