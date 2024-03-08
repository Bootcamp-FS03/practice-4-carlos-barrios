import { PostAuthor } from './post.model';

export interface Comment {
  _id: string;
  text: string;
  author: PostAuthor;
  createdAt: string;
  updatedAt: string;
}

export interface CreateComment {
    author: string | undefined;
    post: string;
    text: string;
  }