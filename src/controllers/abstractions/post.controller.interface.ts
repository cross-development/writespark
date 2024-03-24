// Packages
import { Response, NextFunction } from 'express';
// Dto
import { CreatePostDto } from '../../dto/create-post.dto';
import { RequestParamsDto } from '../../dto/request-params.dto';
// Types
import { TRequestWithBody, TRequestWithParams, TRequest } from './route.interface';

export interface IPostController {
	getPosts(req: TRequest, res: Response, next: NextFunction): Promise<void>;
	getPostById(req: TRequestWithParams<RequestParamsDto>, res: Response, next: NextFunction): Promise<void>;
	createPost(req: TRequestWithBody<CreatePostDto>, res: Response, next: NextFunction): Promise<void>;
	deletePost(req: TRequestWithParams<RequestParamsDto>, res: Response, next: NextFunction): Promise<void>;
}
