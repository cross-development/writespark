// Packages
import { inject, injectable } from 'inversify';
// Repositories
import { UserRepository } from '../repositories/user.repository';
// Constants
import { TYPES } from '../constants/types';
// Types
import { IUserService } from './abstractions/user.service.interface';
import { TUserModelWithPostsAndComments, TUserModelWithScore } from '../types/user.types';
import { ILoggerService } from './abstractions/logger.service.interface';

/**
 * User service is used to interact with the user repository
 */
@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ILoggerService) private readonly loggerService: ILoggerService,
		@inject(TYPES.IUserRepository) private readonly userRepository: UserRepository,
	) {}

	/**
	 * Method is used to get the list of users including their posts and comments
	 * @returns A list of all users including their posts and comments
	 */
	public async getUsers(): Promise<TUserModelWithPostsAndComments[]> {
		return this.userRepository.getAll();
	}

	/**
	 * Method is used to get a user profile
	 * @param id - A user id
	 * @returns A user or null if the post has not been found
	 */
	public async getUserById(id: number): Promise<TUserModelWithPostsAndComments | null> {
		this.loggerService.info('[UserService: getUserById]', `User with id ${id} has been requested`);

		return this.userRepository.getOne(id);
	}

	/**
	 * Method is used to get the sorted list of the top users ranked by their total value
	 * @returns A list of the top users
	 */
	public async getTopUsers(): Promise<TUserModelWithScore[]> {
		const users = await this.userRepository.getAll();

		const userWithScores = users
			.map(({ id, name, email, posts, comments }) => ({
				id,
				name,
				email,
				score: Math.round(posts.length * 0.8 + comments.length * 0.2),
			}))
			.sort((a, b) => b.score - a.score);

		return userWithScores.slice(0, 10);
	}
}
