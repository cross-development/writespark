// Packages
import { compare, hash, genSalt } from 'bcryptjs';

/**
 * A user entity used to create a user object
 */
export class User {
	private _password: string;

	constructor(
		private readonly _email: string,
		private readonly _name: string,
		passwordHash?: string,
	) {
		if (passwordHash) {
			this._password = passwordHash;
		}
	}

	public get email(): string {
		return this._email;
	}

	public get name(): string {
		return this._name;
	}

	public get password(): string {
		return this._password;
	}

	public async setPassword(pass: string, saltLength: number): Promise<void> {
		const salt = await genSalt(saltLength);

		this._password = await hash(pass, salt);
	}

	public async comparePassword(pass: string): Promise<boolean> {
		return compare(pass, this._password);
	}
}
