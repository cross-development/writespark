// Packages
import { Request, Response, NextFunction } from 'express';

export interface IHomeController {
	renderFeed(req: Request, res: Response, next: NextFunction): Promise<void>;
}
