import { injectable, inject } from 'tsyringe';
import { USER_REPOSITORY } from '../user.constants';
import { User } from '../domain/user';
import { UserRepository } from '../domain/user.repository';

@injectable()
export class SaveUserService {
  constructor(@inject(USER_REPOSITORY) private userRepository: UserRepository) {}

  async execute(user: User): Promise<void> {
    await this.userRepository.save(user);
  }
}
