// Packages
import { Request } from 'express';
import { inject, injectable } from 'inversify';
import jwt from 'jsonwebtoken';
// Constants
import { TYPES } from '../constants/types';
// Types
import { TServerConfig } from '../types/app.config.types';
import { IJwtService, TJwtPayload } from './abstractions/jwt.service.interface';
import { IConfigService } from './abstractions/config.service.interface';

/**
 * JWT service is used to perform some actions with a jwt payload and a jwt token
 */
@injectable()
export class JwtService implements IJwtService {
	private readonly jwtSecret: string = '';

	constructor(@inject(TYPES.IConfigService) private readonly configService: IConfigService) {
		this.jwtSecret = this.configService.get<TServerConfig>('server').jwtSecret;
	}

	/**
	 * Method is used to sign the given payload into a jwt string payload (token)
	 * @param dataToSign - Some data to sign and use in a jwt payload
	 * @returns Signed token
	 */
	public sign(dataToSign: Request['user']): string {
		return jwt.sign(
			{
				...dataToSign,
				iat: Math.floor(Date.now() / 1000),
			},
			this.jwtSecret,
			{
				expiresIn: '2h',
				algorithm: 'HS256',
			},
		);
	}

	/**
	 * Method is used to verify given token using a secret to get a decoded token
	 * @param token - A token to verify
	 * @returns The decoded token (its payload)
	 */
	public verify(token: string): TJwtPayload {
		return jwt.verify(token, this.jwtSecret) as TJwtPayload;
	}
}
