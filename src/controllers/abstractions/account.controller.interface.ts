// Dto
import { LoginDto } from '../../dto/login.dto';
import { RegisterDto } from '../../dto/register.dto';
// Types
import { TRequest, TResponse } from './route.interface';
import { TRequestWithBody } from './route.interface';

export interface IAccountController {
	renderLogin(req: TRequest, res: TResponse): Promise<void>;
	login(req: TRequestWithBody<LoginDto>, res: TResponse): Promise<void>;
	renderRegister(req: TRequest, res: TResponse): Promise<void>;
	register(req: TRequestWithBody<RegisterDto>, res: TResponse): Promise<void>;
	logout(req: TRequest, res: TResponse): Promise<void>;
}
