// Domain
import { User } from '../../domain/user';
// Types
import { TUserModel } from '../../types/user.types';

export interface IAccountRepository {
	create(user: User): Promise<TUserModel>;
	find(email: string): Promise<TUserModel | null>;
}
