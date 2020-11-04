import * as mongoose from 'mongoose';

export const BlogSchema = new mongoose.Schema({
  postID: { type: String, unique: true },
  title: String,
  url: String,
  author: String,
  created_at: Date,
  show: { type: Boolean, default: true }
});