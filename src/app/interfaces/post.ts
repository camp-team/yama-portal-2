import { firestore } from 'firebase';
import { User } from './user';

export interface Post {
  id: string;
  userId: string;
  imageURL: string;
  category: string;
  content: string;
  public: boolean;
  isPosition: boolean;
  likeCount: number;
  createdAt: number;
  currentPosition: google.maps.LatLngLiteral;
}

export interface PostWithUser extends Post {
  user: User;
}
