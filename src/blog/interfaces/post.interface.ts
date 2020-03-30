import { Document } from 'mongoose'


// 接口继承自mongoose里的Document接口
export interface Post extends Document {
  readonly title: String;
  readonly description: String;
  readonly body: String;
  readonly author: String;
  readonly date_posted: String;
}
