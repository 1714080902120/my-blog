import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    // 连接数据库
    MongooseModule.forRoot('mongodb://localhost/nest-blog', { useNewUrlParser: true, useUnifiedTopology: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
