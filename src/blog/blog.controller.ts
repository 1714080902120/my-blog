import { QueryType, CreatePostDTO } from './dto/create-post.dto'
import { BlogService } from './blog.service'
import { Controller, Get, Res, HttpStatus, Query, Param, NotFoundException, Post, Body, Put, Delete } from '@nestjs/common'
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes'
@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get('posts-length')
  async getLength(@Res() res) {
    const length = await this.blogService.getPostsLength()
    return res.status(HttpStatus.OK).json(length)
  }

  // 分页获取全部数据
  @Get('posts')
  async getPosts(@Res() res, @Query() query: QueryType) {
    let { skip, limit } = query
    const Posts = await this.blogService.getPosts(skip, limit)
    return res.status(HttpStatus.OK).json(Posts)
  }

  // 模糊查询
  @Get('blur-search')
  async getPost(@Res() res, @Query() query) {
    let { data } = query
    const result = this.blogService.getPost(data)
    return res.status(HttpStatus.OK).json(result)
  }

  // 查询通过ID
  @Get('post/:postId')
  async getPostById(@Res() res, @Param('postId', new ValidateObjectId()) postId) {
    const post = await this.blogService.getPostById(postId)
    if (!post) throw new NotFoundException('Post does not exist!')
    return res.status(HttpStatus.OK).json(post)
  }

  // 增加
  @Post('/post')
  async addPost(@Res() res, @Body() postDTO: CreatePostDTO) {
    const newPost = await this.blogService.addPost(postDTO);
    return res.status(HttpStatus.OK).json({
      message: "Post has been submitted successfully!",
      post: newPost
    })
  }

  // 修改
  @Put('/edit')
  async editPost(
    @Res() res,
    @Query('postId', new ValidateObjectId()) postId,
    @Body() postDTO: CreatePostDTO
  ) {
    const editedPost = await this.blogService.editPost(postId, postDTO);
    if (!editedPost) throw new NotFoundException('Post does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Post has been successfully updated',
      post: editedPost
    })
  }

  // 删除
  @Delete('/delete')
  async deletePost(@Res() res, @Query('postId', new ValidateObjectId()) postId) {
    const deletedPost = await this.blogService.deletePost(postId);
    if (!deletedPost) throw new NotFoundException('Post does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Post has been deleted!',
      post: deletedPost
    })
  }
}
