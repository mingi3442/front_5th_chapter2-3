import { User } from '../../../entities/user/types';


export interface UserUseCase {
  getUserProfile: (userId: number) => Promise<User>
}