// Packages
import { injectable } from 'inversify';
// Types
import { IUserService } from './abstractions/user.service.interface';

@injectable()
export class UserService implements IUserService {}
