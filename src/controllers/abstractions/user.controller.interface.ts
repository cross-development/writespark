// Packages
import { Request, Response, NextFunction } from 'express';

export interface IUserController {
	info(req: Request, res: Response, next: NextFunction): Promise<void>;
}
