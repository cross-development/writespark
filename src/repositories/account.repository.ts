// Packages
import { inject, injectable } from 'inversify';
// Persistance
import { UserModel } from '@prisma/client';
// Domain
import { User } from '../domain/user';
// Services
import { PrismaService } from '../persistence/prisma.service';
// Constants
import { TYPES } from '../constants/types';
// Types
import { IAccountRepository } from './abstractions/account.repository.interface';

/**
 * An account repository that interacts with a user model
 */
@injectable()
export class AccountRepository implements IAccountRepository {
	constructor(@inject(TYPES.PrismaService) private readonly prismaService: PrismaService) {}

	/**
	 * Method is used to create a new user
	 * @param user - A user entity
	 * @returns Created user
	 */
	public create(user: User): Promise<UserModel> {
		const { email, name, password } = user;

		return this.prismaService.client.userModel.create({
			data: { email, name, password },
		});
	}

	/**
	 * Method is used to find a user by their email
	 * @param email - A user email
	 * @returns A user or null if the user doesn't exist
	 */
	public find(email: string): Promise<UserModel | null> {
		return this.prismaService.client.userModel.findFirst({ where: { email } });
	}
}
