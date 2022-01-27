import { getCustomRepository } from 'typeorm';
import { ComplimentsRepositories } from '../repositories/ComplimentsRepositories';
import { UsersRepositories } from '../repositories/UserRepositories';

interface IComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

class CreateComplimentService{
  async execute({ tag_id, user_sender, user_receiver, message }: IComplimentRequest){
    const complimentRepositories = getCustomRepository(ComplimentsRepositories);
    const userRepositories = getCustomRepository(UsersRepositories);

    if (user_sender === user_receiver) {
      throw new Error('Incorrect receiver');
    }

    const userReceiverExists = await userRepositories.findOne(user_receiver);

    if(!userReceiverExists){
      throw new Error('This user does not exist');
    }

    const compliment = await complimentRepositories.create({
      tag_id,
      user_receiver,
      user_sender,
      message,
    });

    await complimentRepositories.save(compliment);

    return compliment;
  }
}

export { CreateComplimentService };
