import { firestore } from 'firebase';

export interface Post {
  id: string;
  userId: string;
  label: string;
  content: string;
  public: boolean;
  createdAt: firestore.Timestamp;
}
