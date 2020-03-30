import { CreatePostDTO } from './dto/create-post.dto';
import { Post } from './interfaces/post.interface'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

// service类 用于处理具体业务逻辑
@Injectable()
export class BlogService {
  constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}

  // 分页获取所有数据
  async getPosts(s: Number = 0, l: Number = 10, mod: Model<Post> = this.postModel): Promise<Post[]> {
    const posts = await mod.find().skip(s).limit(l).exec()
    return posts
  }

  // 获取全部数据个数
  async getPostsLength(): Promise<Number> {
    let length: Number = 0
    await this.postModel.find().then(res => {
      length = res.length
    })
    return length
  }
  
  // 获取单个ID
  async getPostById (postId: String, mod: Model<Post> = this.postModel): Promise<Post> {
    const post = await mod.findById(postId).exec()
    return post
  }

  // 模糊查询
  async getPost(data: String): Promise<Post[]> {
    const blurSearchObj: Post = new CreatePostDTO
    let list: Post[] = []
    for (let key in blurSearchObj) {
      // 坑1 mongodb的搜索字段名使用变量得用[]包扣住
      await this.postModel.find({ [key]: { $regex: data, $options: 'i' }}).then(res => {
        if (res && res.length > 0) list.push(res)
      })
    }
    return list
  }

  // 添加
  async addPost(postDTO: CreatePostDTO): Promise<Post> {
    const model = await this.postModel(postDTO)
    return model.save()
  }

  // 修改
  async editPost(postId: String, postDTO: CreatePostDTO): Promise<Post> {
    const editPost = await this.postModel.findByIdAndUpdate(postId, postDTO, { new: true })
    return editPost
  }

  // 删除
  async deletePost(postId: String): Promise<any> {
    const deletePost = await this.postModel.findByIdAndRemove(postId)
    return deletePost
  }
}
