// Packages
import { inject, injectable } from 'inversify';
// Domain
import { User } from '../domain/user';
// Services
import { PrismaService } from '../persistence/prisma.service';
// Constants
import { TYPES } from '../constants/types';
// Types
import { TUserModel } from '../types/user.types';
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
	public create(user: User): Promise<TUserModel> {
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
	public find(email: string): Promise<TUserModel | null> {
		return this.prismaService.client.userModel.findFirst({ where: { email } });
	}
}
