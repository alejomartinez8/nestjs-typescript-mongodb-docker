export class UpdateAPIPostDTO {
  readonly postID: string;
  readonly title: string;
  readonly url: string;
  readonly author: string;
  readonly created_at: Date;
}