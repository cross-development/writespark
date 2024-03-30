// Packages
import { Response, NextFunction } from 'express';
// Dto
import { CreatePostDto } from '../../dto/create-post.dto';
import { RequestParamsDto } from '../../dto/request-params.dto';
import { CreateCommentDto } from '../../dto/create-comment.dto';
// Types
import { TRequestWithBody, TRequestWithParams, TRequest, TRequestWithParamsAndBody } from './route.interface';

export interface IPostController {
	renderAllPosts(req: TRequest, res: Response): Promise<void>;
	renderCreatePost(req: TRequest, res: Response): Promise<void>;
	renderOnePost(req: TRequestWithParams<RequestParamsDto>, res: Response): Promise<void>;
	renderDeletePost(req: TRequestWithParams<RequestParamsDto>, res: Response): Promise<void>;
	createPost(req: TRequestWithBody<CreatePostDto>, res: Response): Promise<void>;
	createComment(req: TRequestWithParamsAndBody<RequestParamsDto, CreateCommentDto>, res: Response): Promise<void>;
	deletePost(req: TRequestWithParams<RequestParamsDto>, res: Response, next: NextFunction): Promise<void>;
}
