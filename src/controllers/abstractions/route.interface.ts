// Packages
import { Request, Response, NextFunction, Router } from 'express';
// Types
import { IMiddleware } from '../../middleware/abstractions/middleware.interface';

export interface IControllerRoute {
	path: string;
	middleware?: IMiddleware[];
	method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>;
	handler(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export type TResponse = Response<any, Record<string, any>>;

export type TRequest<T = any> = Request<{}, {}, T>;
