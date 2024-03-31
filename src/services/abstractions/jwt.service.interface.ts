// Packages
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export type TJwtPayload = JwtPayload & Request['user'];

export interface IJwtService {
	sign(dataToSign: Request['user']): string;
	verify(token: string): TJwtPayload;
}
