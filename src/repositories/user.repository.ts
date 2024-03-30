// Packages
import { inject, injectable } from 'inversify';
// Persistence
import { UserModel } from '@prisma/client';
// Services
import { PrismaService } from '../persistence/prisma.service';
// Constants
import { TYPES } from '../constants/types';
// Types
import { IUserRepository } from './abstractions/user.repository.interface';

/**
 * A user repository that interacts with a user model in the database
 */
@injectable()
export class UserRepository implements IUserRepository {
	constructor(@inject(TYPES.PrismaService) private readonly prismaService: PrismaService) {}

	/**
	 * Method which is used to get a user
	 * @param id - A user id
	 * @returns A user or null if the user doesn't exist
	 */
	public getOne(id: number): Promise<UserModel | null> {
		return this.prismaService.client.userModel.findUnique({ where: { id } });
	}
}
