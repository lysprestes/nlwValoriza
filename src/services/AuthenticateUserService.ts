import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UserRepositories';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface IAuthenticateUserService {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({email, password}: IAuthenticateUserService) {
    const usersRepository = getCustomRepository(UsersRepositories);

    const user = await usersRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Password does not match');
    }

    const token = sign({
      email: user.email,
    }, 'abf295c865f5d50a414457c1ab4479d9', {
      subject: user.id,
      expiresIn: '1d',
    });

    return token;
  }
};

export { AuthenticateUserService };