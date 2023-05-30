import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { ConfirmationActionMessage, RootService } from 'src/helpers/root-service';
import { UpdateUserDto } from './dto/update-user-dto';

@Injectable()
export class UserService extends RootService {
    public giveEntityName(): string {
        return "user"
    }

    public async create(createUserDto: CreateUserDto) {
        const { firstName, lastName, email } = createUserDto;
        // Check if user already exist
        const numberOfUserWithSameEmail = await this.prismaService.user.count({ where: { email } })
        if (numberOfUserWithSameEmail > 0) {
            throw new ConflictException(`${this.getEntityNameCapitalized()} with this email already exist`)
        }
        // Create user in BDD
        return await this.prismaService.user.create({ data: { firstName, lastName, email } })
    }

    public async update(id: number, updateEntityDto: UpdateUserDto) {
        this.verifyEntityExist(id);

        // Check duplicated email
        if (updateEntityDto.email) {
            const numberOfUserWithSameEmail = await this.prismaService.user.count({
                where: {
                    email: updateEntityDto.email,
                    id: { not: id }
                }
            })
            if (numberOfUserWithSameEmail > 0) {
                throw new ConflictException(`${this.getEntityNameCapitalized()} with this email already exist`)
            }
        }

        // Update user
        return await this.prismaService.user.update({ where: { id }, data: { ...updateEntityDto } })
    }
}
