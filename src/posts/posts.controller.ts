import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post-dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  // Injecting Posts Service
  constructor(private readonly postsService: PostsService) {}

  @Get('/:userId')
  public getPosts(@Param('userId') userId: string) {
    return this.postsService.findAll(userId);
  }

  @ApiOperation({
    summary: 'Creates a new blog post',
  })
  @ApiResponse({
    status: 201,
    description: 'You get a 201 response if your post is created successfully',
    example: {
      title: "What's new with NestJS",
      postType: 'post',
      slug: 'new-with-nestjs',
      status: 'published',
      content: 'test content',
      schema:
        '{"id":102,"name":"Luna","active":true,"score":8.6,"tags":["new","vip"]}',
      featuredImageUrl: 'https://example.com/images/featured.jpg',
      publishOn: '2024-03-16T07:46:32+0000',
      tags: ['nestjs', 'typescript'],
      metaOptions: [{ key: 'testKey', value: 20 }],
    },
  })
  @Post()
  public createPost(@Body() createPostDto: CreatePostDto) {
    console.log(createPostDto);
    return createPostDto;
  }

  @ApiOperation({
    summary: 'Updates an existing blog post',
  })
  @ApiResponse({
    status: 200,
    description: 'A 200 response if your post is updated successfully',
  })
  @Patch()
  public updatePost(@Body() patchPostsDto: PatchPostDto) {
    console.log(patchPostsDto);
  }
}
