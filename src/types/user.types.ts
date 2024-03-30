// Persistance
import { CommentModel, PostModel, UserModel } from '@prisma/client';

export type TUserModel = Omit<UserModel, 'password'>;

export type TUserModelWithPostsAndComments = TUserModel & {
	posts: PostModel[];
	comments: CommentModel[];
};

export type TUserModelWithScore = TUserModel & {
	score: number;
};
