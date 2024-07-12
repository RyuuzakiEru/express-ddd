import { injectable, inject } from 'tsyringe';
import { USER_REPOSITORY } from '../user.constants';
import { UserRepository } from '../domain/user.repository';
import { User } from '../domain/user';
import { UserNotFoundError } from '../domain/errors/user-not-found.error';

@injectable()
export class GetUserByIdService {
  constructor(@inject(USER_REPOSITORY) private userRepository: UserRepository) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UserNotFoundError(`User ${id} not found`);
    }

    return user;
  }
}
