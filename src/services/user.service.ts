// Packages
import { inject, injectable } from 'inversify';
// Persistance
import { UserModel } from '@prisma/client';
// Repositories
import { UserRepository } from '../repositories/user.repository';
// Constants
import { TYPES } from '../constants/types';
// Types
import { IUserService } from './abstractions/user.service.interface';

/**
 * User service which is used to interact with the user repository
 */
@injectable()
export class UserService implements IUserService {
	constructor(@inject(TYPES.IUserRepository) private readonly userRepository: UserRepository) {}

	/**
	 * Method which is used to get a user profile
	 * @param id - A user id
	 * @returns A user or null if the post has not been found
	 */
	public async getUserProfile(id: number): Promise<UserModel | null> {
		return this.userRepository.getOne(id);
	}
}
