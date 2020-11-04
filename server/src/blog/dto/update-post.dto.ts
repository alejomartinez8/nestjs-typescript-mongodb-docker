export class UpdatePostDTO {
  readonly _id: string;
  readonly postID: string;
  readonly title: string;
  readonly url: string;
  readonly author: string;
  readonly created_at: Date;
  readonly show: boolean;
}