// Types
import { TUserModelWithPostsAndComments } from '../../types/user.types';

export interface IUserRepository {
	getAll(): Promise<TUserModelWithPostsAndComments[]>;
	getOne(id: number): Promise<TUserModelWithPostsAndComments | null>;
}
