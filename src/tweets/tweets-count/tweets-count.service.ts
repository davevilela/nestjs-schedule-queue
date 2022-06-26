import { InjectQueue } from '@nestjs/bull';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/sequelize';
import { Queue } from 'bull';
import { Cache } from 'cache-manager';
import { Tweet } from '../entities/tweet.entity';

@Injectable()
export class TweetsCountService {
  limit = 10;
  constructor(
    @InjectModel(Tweet) private tweetModel: typeof Tweet,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectQueue('emails') private queueService: Queue,
  ) {}
  @Interval(5000)
  async countTweets() {
    const offset = (await this.cacheManager.get<number>('tweet-offset')) || 0;
    console.log(`searching tweets. offset: ${offset}`);

    const tweets = await this.tweetModel.findAll({
      offset,
      limit: this.limit,
    });

    if (tweets.length > 0) {
      this.cacheManager.set('tweet-offset', offset + this.limit, {
        ttl: 1 * 60 * 10,
      });
      console.log(`${tweets.length} new tweets`);
      await this.queueService.add({ tweets: tweets.map((t) => t.toJSON()) });
    }
  }
}
