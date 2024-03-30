// Packages
import { inject, injectable } from 'inversify';
// Services
import { PrismaService } from '../persistence/prisma.service';
// Constants
import { TYPES } from '../constants/types';
// Types
import { TUserModelWithPostsAndComments } from '../types/user.types';
import { IUserRepository } from './abstractions/user.repository.interface';

/**
 * A user repository that interacts with a user model in the database
 */
@injectable()
export class UserRepository implements IUserRepository {
	constructor(@inject(TYPES.PrismaService) private readonly prismaService: PrismaService) {}

	/**
	 * Method is used to get all users including their posts and comments
	 * @returns A list of all users
	 */
	public getAll(): Promise<TUserModelWithPostsAndComments[]> {
		return this.prismaService.client.userModel.findMany({
			orderBy: { name: 'asc' },
			select: { id: true, name: true, email: true, posts: true, comments: true },
		});
	}

	/**
	 * Method which is used to get a user
	 * @param id - A user id
	 * @returns A user or null if the user doesn't exist
	 */
	public getOne(id: number): Promise<TUserModelWithPostsAndComments | null> {
		return this.prismaService.client.userModel.findUnique({
			where: { id },
			select: {
				id: true,
				name: true,
				email: true,
				posts: {
					orderBy: { createdAt: 'desc' },
					include: { comments: true },
				},
				comments: true,
			},
		});
	}
}
