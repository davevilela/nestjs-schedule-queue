import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { Tweet } from './entities/tweet.entity';

@Injectable()
export class TweetsService {
  constructor(@InjectModel(Tweet) private tweetModel: typeof Tweet) {}
  async create(createTweetDto: CreateTweetDto) {
    const response = await this.tweetModel.create(createTweetDto as any);

    return response;
  }

  findAll() {
    return this.tweetModel.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} tweet`;
  }

  update(id: number, updateTweetDto: UpdateTweetDto) {
    // this.tweetModel.update({

    // })
    return `This action updates a #${id} tweet`;
  }

  remove(id: number) {
    return `This action removes a #${id} tweet`;
  }
}
