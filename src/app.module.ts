import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';
import { TweetsModule } from './tweets/tweets.module';

@Module({
  imports: [TweetsModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
