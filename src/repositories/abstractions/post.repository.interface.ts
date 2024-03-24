// Persistence
import { PostModel } from '@prisma/client';
// Domain
import { Post } from '../../domain/post';

export type TPostParams =
	| {
			id: number;
			title?: string;
			authorId?: number;
	  }
	| {
			title: string;
			id?: number;
			authorId?: number;
	  };

export interface IPostRepository {
	getAll(authorId?: number): Promise<PostModel[]>;
	getOne(params: TPostParams): Promise<PostModel | null>;
	create(data: Post): Promise<PostModel>;
	delete(id: number): Promise<PostModel>;
}
