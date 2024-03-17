// Packages
import { Request, Response, NextFunction } from 'express';

export interface IAccountController {
	login(req: Request, res: Response, next: NextFunction): Promise<void>;
	register(req: Request, res: Response, next: NextFunction): Promise<void>;
}
