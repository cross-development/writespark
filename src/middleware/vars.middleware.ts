// Packages
import { Request, Response, NextFunction } from 'express';
// Types
import { IMiddleware } from './abstractions/middleware.interface';

/**
 * A middleware to initialize local variables
 */
export class VarsMiddleware implements IMiddleware {
	/**
	 * Method is used to execute a validation
	 * @param req - The express request
	 * @param res - The express response
	 * @param next - The next function called to pass the request further
	 */
	public execute(req: Request, res: Response, next: NextFunction): void {
		if (req.user) {
			res.locals.isAuth = req.user.isAuthentication;
		}

		next();
	}
}
