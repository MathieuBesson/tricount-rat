import { Injectable, NotFoundException } from "@nestjs/common";
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
        return await this.prismaService[this.entityName].findMany();
    }

    public async readOne(id: number) {
        await this.verifyEntityExist(id);
        return this.prismaService.user.findUnique({ where: { id } })
    }

    public async create(createEntityDto: any): Promise<ConfirmationActionMessage> {
        await this.prismaService[this.entityName].create({ data: { ...createEntityDto } })
        return { message: `${this.getEntityNameCapitalized()} created` }
    }

    public async update(id: number, updateEntityDto: any): Promise<ConfirmationActionMessage> {
        await this.verifyEntityExist(id);
        await this.prismaService[this.entityName].update({ where: { id }, data: { ...updateEntityDto } })
        return { message: `${this.getEntityNameCapitalized()} updated` }
    }

    public async delete(id: number): Promise<ConfirmationActionMessage> {
        await this.verifyEntityExist(id);
        await this.prismaService[this.entityName].delete({ where: { id } })
        return { message: `${this.getEntityNameCapitalized()} deleted` }
    }

    protected async verifyEntityExist(id: number): Promise<void> {
        // Check if entity exist
        const entity = await this.prismaService[this.entityName].count({ where: { id } })
        if (!entity) {
            throw new NotFoundException(`This ${this.entityName} not exist`);
        }
    }

    public getEntityNameCapitalized(): string {
        return StringHelper.capitalize(this.entityName);
    }
}
