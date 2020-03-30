import { BlogSchema } from './schema/blog.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Post', schema: BlogSchema }])
  ],
  providers: [BlogService],
  controllers: [BlogController]
})
export class BlogModule {}
