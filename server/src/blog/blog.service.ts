import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './interfaces/post.interface';
import { UpdatePostDTO } from './dto/update-post.dto';
import { UpdateAPIPostDTO } from './dto/update-api-post.dto';

@Injectable()
export class BlogService {
  constructor(@InjectModel('Post') private readonly postModel: Model<Post>) { }

  private readonly logger = new Logger(BlogService.name);

  async getPosts(): Promise<Post[]> {
    try {
      return await this.postModel.find();
    } catch (error) {
      throw error;
    }
  }

  async editPost(_id, updatePost: UpdatePostDTO): Promise<Post> {
    try {
      const editedPost = await this.postModel
        .findOneAndUpdate({ _id: _id }, updatePost, { useFindAndModify: false });
      return editedPost;
    } catch (error) {
      throw error;
    }

  }

  async updateOrCreatePost(updateAPIPostDTO: UpdateAPIPostDTO): Promise<Post> {
    try {
      let post = await this.postModel
        .findOneAndUpdate({ postID: updateAPIPostDTO.postID }, updateAPIPostDTO, { useFindAndModify: false });
      if (!post) post = await this.postModel.create(updateAPIPostDTO);
      return post;
    } catch (error) {
      throw error;
    }
  };
}
