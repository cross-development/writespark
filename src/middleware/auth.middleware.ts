// Packages
import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
// Types
import { IMiddleware } from './abstractions/middleware.interface';

/**
 * A middleware to validate a user authentication
 */
export class AuthMiddleware implements IMiddleware {
	constructor(private readonly secret: string) {}

	/**
	 * Method is used to execute a validation
	 * @param req - The express request
	 * @param res - The express response
	 * @param next - The next function called to pass the request further
	 */
	public execute(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			const token = req.headers.authorization.split(' ')[1];

			verify(token, this.secret, (error, payload) => {
				if (error) {
					next();
				} else if (payload) {
					req.user = payload.email;

					next();
				}
			});
		} else {
			next();
		}
	}
}
