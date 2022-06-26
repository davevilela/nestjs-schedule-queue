import { CacheModule, Module } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { TweetsController } from './tweets.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tweet } from './entities/tweet.entity';
import { TweetsCountService } from './tweets-count/tweets-count.service';
import { BullModule } from '@nestjs/bull';
import { MailerModule } from 'src/mailer/mailer.module';
import { SendMailWithTweetsJob } from 'src/mailer/send-mail-with-tweets.job';

@Module({
  imports: [
    SequelizeModule.forFeature([Tweet]),
    CacheModule.register(),
    BullModule.registerQueue({
      name: 'emails',
    }),
    MailerModule,
  ],
  controllers: [TweetsController],
  providers: [TweetsService, TweetsCountService],
})
export class TweetsModule {}
