import { Injectable, Logger, HttpService } from '@nestjs/common';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
import { BlogService } from '../blog/blog.service';
import { UpdateAPIPostDTO } from '../blog/dto/update-api-post.dto';

@Injectable()
export class CronService {

  constructor(
    private httpService: HttpService,
    private blogService: BlogService
  ) { }

  private readonly logger = new Logger(CronService.name);

  @Timeout('first_time', 1000)
  firstCron(): void {
    this.logger.debug('Calling API firstTime');
    this.handleCron();
  }

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron(): Promise<any> {
    this.logger.debug('Called every hour');
    try {
      const response = await this.httpService.get('https://hn.algolia.com/api/v1/search_by_date?query=nodejs').toPromise();

      if (response.status === 200) {
        const { hits } = response.data;
        const newPosts = hits.map((item: any) => {
          const post: UpdateAPIPostDTO = {
            postID: item.objectID,
            title: item.title !== null ? item.title : item.story_title,
            url: item.url !== null ? item.url : item.story_url,
            author: item.author !== null ? item.author : item.story_author,
            created_at: item.created_at,
          };

          if (post.postID !== null && post.title !== null && post.url !== null) {
            return post;
          }
        }).filter((post: UpdateAPIPostDTO) => post !== undefined);

        newPosts.forEach((element: UpdateAPIPostDTO) => {
          this.blogService.updateOrCreatePost(element);
        });
      }

    } catch (error) {
      console.error(error);
    }
  }
}
