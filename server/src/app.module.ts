import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { BlogModule } from './blog/blog.module';
import { CronModule } from './cron/cron.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI, { useNewUrlParser: true }),
    BlogModule,
    ScheduleModule.forRoot(),
    CronModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
