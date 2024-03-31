// Dto
import { LoginDto } from '../../dto/login.dto';
import { RegisterDto } from '../../dto/register.dto';
// Types
import { TUserModel } from '../../types/user.types';

export interface IAccountService {
	createUser(dto: RegisterDto): Promise<TUserModel | null>;
	validateUser(dto: LoginDto): Promise<TUserModel | null>;
}
