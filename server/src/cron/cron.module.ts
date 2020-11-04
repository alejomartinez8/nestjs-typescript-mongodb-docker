import { HttpModule, Module } from '@nestjs/common';
import { BlogModule } from '../blog/blog.module';
import { CronService } from './cron.service';

@Module({
  imports: [HttpModule, BlogModule],
  providers: [CronService]
})
export class CronModule { }
