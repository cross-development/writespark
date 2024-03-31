// Persistence
import { PostModel } from '@prisma/client';

export type TPostModel = PostModel;

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
