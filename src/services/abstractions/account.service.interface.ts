// Persistance
import { UserModel } from '@prisma/client';
// Dto
import { LoginDto } from '../../dto/login.dto';
import { RegisterDto } from '../../dto/register.dto';

export interface IAccountService {
	createUser(dto: RegisterDto): Promise<UserModel | null>;
	validateUser(dto: LoginDto): Promise<UserModel | null>;
	getProfile(email: string): Promise<UserModel | null>;
}
