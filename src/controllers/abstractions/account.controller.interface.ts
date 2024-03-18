// Packages
import { Request, Response, NextFunction } from 'express';
// Types
import { TRequest } from './route.interface';

export interface IAccountController {
	getProfile(req: Request, res: Response, next: NextFunction): Promise<void>;
	login(req: TRequest, res: Response, next: NextFunction): Promise<void>;
	register(req: TRequest, res: Response, next: NextFunction): Promise<void>;
}
