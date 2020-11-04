import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Query, Put, Delete } from '@nestjs/common';
import { BlogService } from './blog.service';
import { UpdatePostDTO } from './dto/update-post.dto';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';


@Controller('blog')
export class BlogController {

  constructor(private blogService: BlogService) { }

  // Fetch all posts
  @Get('posts')
  async getPosts(@Res() res) {
    const posts = await this.blogService.getPosts();
    return res.status(HttpStatus.OK).json(posts);
  }

  // Edit a particular post using ID
  @Put('/edit')
  async editPost(@Res() res, @Query('_id', new ValidateObjectId()) postID, @Body() createPostDTO: UpdatePostDTO) {
    const editedPost = await this.blogService.editPost(postID, createPostDTO);
    if (!editedPost) throw new NotFoundException('Post does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Post has been successfully updated',
      post: editedPost
    });
  }
}