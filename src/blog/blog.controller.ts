import { QueryType, CreatePostDTO } from './dto/create-post.dto'
import { BlogService } from './blog.service'
import { Controller, Get, Res, HttpStatus, Query, Param, NotFoundException, Post, Body, Put, Delete } from '@nestjs/common'
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes'
import { ApiTags, ApiOperation } from '@nestjs/swagger';


@ApiTags('博客')
@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @ApiTags('博客总数量')
  @Get('posts-length')
  @ApiOperation({ summary: 'posts-length', description: '无参数'})
  async getLength(@Res() res) {
    const length = await this.blogService.getPostsLength()
    return res.status(HttpStatus.OK).json(length)
  }

  // 分页获取全部数据
  @ApiTags('分页获取数据， 默认{ skip = 0, limit = 10 }')
  @Get('posts')
  @ApiOperation({ summary: 'posts', description: '参数{ skip：页数默认为0， limit：每页数量默认为10 }'})
  async getPosts(@Res() res, @Query() query: QueryType) {
    let { skip, limit } = query
    skip = Number(skip)
    limit = Number(limit)
    const Posts = await this.blogService.getPosts(skip, limit)
    return res.status(HttpStatus.OK).json(Posts)
  }

  // 模糊查询
  @ApiTags('模糊查询,可以为任意字符串')
  @Get('blur-search')
  @ApiOperation({ summary: 'blur-search', description: '参数为任意字符串'})
  async getPost(@Res() res, @Query() query) {
    let { data } = query
    const result = this.blogService.getPost(data)
    return res.status(HttpStatus.OK).json(result)
  }

  // 查询通过ID
  @ApiTags('通过ID查询')
  @Get('post/:postId')
  @ApiOperation({ summary: 'post/:postId', description: '参数为postId'})
  async getPostById(@Res() res, @Param('postId', new ValidateObjectId()) postId) {
    const post = await this.blogService.getPostById(postId)
    if (!post) throw new NotFoundException('Post does not exist!')
    return res.status(HttpStatus.OK).json(post)
  }

  // 增加
  @ApiTags('添加')
  @Post('/post')
  @ApiOperation({ summary: '/post', description: '参数需要满足Post模型'})
  async addPost(@Res() res, @Body() postDTO: CreatePostDTO) {
    const newPost = await this.blogService.addPost(postDTO);
    return res.status(HttpStatus.OK).json({
      message: "Post has been submitted successfully!",
      post: newPost
    })
  }

  // 修改
  @ApiTags('修改')
  @Put('/edit')
  @ApiOperation({ summary: 'edit', description: '参数需要满足Post模型'})
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
  @ApiTags('删除')
  @Delete('/delete')
  @ApiOperation({ summary: 'delete', description: '无参数'})
  async deletePost(@Res() res, @Query('postId', new ValidateObjectId()) postId) {
    const deletedPost = await this.blogService.deletePost(postId);
    if (!deletedPost) throw new NotFoundException('Post does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Post has been deleted!',
      post: deletedPost
    })
  }
}
