import { Document } from 'mongoose';

export interface Post extends Document {
  readonly postID: string,
  readonly title: string,
  readonly url: string,
  readonly author: string,
  readonly created_at: Date,
  readonly show: boolean;
}