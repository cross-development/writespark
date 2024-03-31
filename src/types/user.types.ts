// Persistance
import { CommentModel, PostModel, UserModel } from '@prisma/client';

export type TUserModel = UserModel;

export type TUserModelWithoutPwd = Omit<UserModel, 'password'>;

export type TUserModelWithPostsAndComments = TUserModelWithoutPwd & {
	posts: PostModel[];
	comments: CommentModel[];
};

export type TUserModelWithScore = TUserModelWithoutPwd & {
	score: number;
};
