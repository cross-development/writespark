// Packages
import { Request, Response, NextFunction } from 'express';
// Types
import { TRequest } from './route.interface';

export interface IPostController {
	getAllPosts(req: Request, res: Response, next: NextFunction): Promise<void>;
	getOnePost(req: Request, res: Response, next: NextFunction): Promise<void>;
	createPost(req: TRequest, res: Response, next: NextFunction): Promise<void>;
	deletePost(req: Request, res: Response, next: NextFunction): Promise<void>;
}
