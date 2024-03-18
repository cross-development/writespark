// Persistance
import { UserModel } from '@prisma/client';
// Domain
import { User } from '../../domain/user';

export interface IAccountRepository {
	create(user: User): Promise<UserModel>;
	find(email: string): Promise<UserModel | null>;
}
