import { Test, TestingModule } from '@nestjs/testing';
import { BlogService } from './blog.service';
import { getModelToken } from '@nestjs/mongoose';
import { UpdatePostDTO } from './dto/update-post.dto';
import { UpdateAPIPostDTO } from './dto/update-api-post.dto';

const post = {
  _id: "5f9b82631706db41ac828d9e",
  show: true,
  postID: "24938203",
  title: "Coinbase Card",
  url: "https://www.coinbase.com/card",
  author: "brian_cloutier",
  created_at: new Date("2020-10-30T01:35:02.000Z")
};

class PostModel {
  constructor(private data) { }
  static create = jest.fn().mockResolvedValue(post);
  static find = jest.fn().mockResolvedValue([post]);
  static findOneAndUpdate = jest.fn().mockResolvedValue(post);
}

describe('BlogService', () => {
  let blogService: BlogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogService,
        {
          provide: getModelToken('Post'),
          useValue: PostModel
        }
      ],
    }).compile();

    blogService = module.get<BlogService>(BlogService);
  });

  it('should return all the posts', () => {
    expect(blogService.getPosts()).resolves.toEqual([post]).catch(err => console.log(err));
  });

  it('should return post from API update by postID', () => {
    const updateAPIPostDTO: UpdateAPIPostDTO =
    {
      postID: "24938203",
      title: "Coinbase Card",
      url: "https://www.coinbase.com/card",
      author: "brian_cloutier",
      created_at: new Date("2020-10-30T01:35:02.000Z")
    };

    expect(blogService.updateOrCreatePost(updateAPIPostDTO)).resolves.toEqual(post).catch(err => console.log(err));
  });

  it('should return post updated by Id', () => {
    const updatePostDTO: UpdatePostDTO =
    {
      _id: "5f9b82631706db41ac828d9e",
      show: true,
      postID: "24938203",
      title: "Coinbase Card",
      url: "https://www.coinbase.com/card",
      author: "brian_cloutier",
      created_at: new Date("2020-10-30T01:35:02.000Z")
    };

    expect(blogService
      .editPost(updatePostDTO._id, updatePostDTO))
      .resolves.toEqual(post)
      .catch(err => console.log(err));
  });
});