// Persistance
import { UserModel } from '@prisma/client';

export interface IUserService {
	getUserProfile(id: number): Promise<UserModel | null>;
}
