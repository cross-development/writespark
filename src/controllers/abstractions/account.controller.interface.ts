// Packages
import { Request, Response, NextFunction } from 'express';
// Dto
import { LoginDto } from '../../dto/login.dto';
import { RegisterDto } from '../../dto/register.dto';
// Types
import { TRequestWithBody } from './route.interface';

export interface IAccountController {
	getProfile(req: Request, res: Response, next: NextFunction): Promise<void>;
	login(req: TRequestWithBody<LoginDto>, res: Response, next: NextFunction): Promise<void>;
	register(req: TRequestWithBody<RegisterDto>, res: Response, next: NextFunction): Promise<void>;
}
