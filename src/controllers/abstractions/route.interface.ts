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

export type TRequest = Request | TRequestWithBody | TRequestWithParams | TRequestWithParamsAndBody;

export type TRequestWithBody<B = any> = Request<{}, {}, B>;

export type TRequestWithParams<P = ParamsDictionary> = Request<P>;

export type TRequestWithParamsAndBody<P = ParamsDictionary, B = any> = Request<P, {}, B>;
