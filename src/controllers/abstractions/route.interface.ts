// Packages
import { Request, Response, NextFunction, Router } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
// Types
import { IMiddleware } from '../../middleware/abstractions/middleware.interface';

export interface IControllerRoute {
	path: string;
	middleware?: IMiddleware[];
	method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>;
	handler(req: TRequest, res: Response, next: NextFunction): Promise<void>;
}

export type TResponse = Response<any, Record<string, any>>;

export type TRequest = Request | TRequestWithBody | TRequestWithParams;

export type TRequestWithBody<T = any> = Request<{}, {}, T>;

export type TRequestWithParams<T = ParamsDictionary> = Request<T>;
