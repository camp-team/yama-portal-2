import { firestore } from 'firebase';
import { User } from './user';

export interface Post {
  id: string;
  userId: string;
  imageURL: string;
  category: string;
  content: string;
  public: boolean;
  likeCount: number;
  createdAt: firestore.Timestamp;
}

export interface PostWithUser extends Post {
  user: User;
}
