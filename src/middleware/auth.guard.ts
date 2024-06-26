// Packages
import { Request, Response, NextFunction } from 'express';
// Types
import { IMiddleware } from './abstractions/middleware.interface';

/**
 * A middleware to validate the user inside a request
 */
export class AuthGuard implements IMiddleware {
	/**
	 * Method is used to execute a validation
	 * @param req - The express request
	 * @param res - The express response
	 * @param next - The next function called to pass the request further
	 */
	public execute(req: Request, res: Response, next: NextFunction): void {
		if (req.user) {
			return next();
		}

		return res.redirect('/auth/login');
	}
}
