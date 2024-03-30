// Types
import { TUserModelWithScore, TUserModelWithPostsAndComments } from '../../types/user.types';

export interface IUserService {
	getUsers(): Promise<TUserModelWithPostsAndComments[]>;
	getUserById(id: number): Promise<TUserModelWithPostsAndComments | null>;
	getTopUsers(): Promise<TUserModelWithScore[]>;
}
