// Packages
import { injectable } from 'inversify';
// Types
import { IUserRepository } from './abstractions/user.repository.interface';

@injectable()
export class UserRepository implements IUserRepository {}
