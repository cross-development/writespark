// Persistence
import { UserModel } from '@prisma/client';

export interface IUserRepository {
	getOne(id: number): Promise<UserModel | null>;
}
