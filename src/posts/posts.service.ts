import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOptions } from 'src/meta-options/meta-option.entity';
import { TagsService } from 'src/tags/tags.service';
import { PatchPostDto } from './dtos/patch-post-dto';

@Injectable()
export class PostsService {
  constructor(
    /**
     * Injecting User Service
     */
    private readonly usersService: UsersService,
    /**
     * Inject postsRepository
     */
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    /**
     * Inject metaOptionsRepository
     */
    @InjectRepository(MetaOptions)
    private readonly metaOptionsRepository: Repository<MetaOptions>,
    /**
     * Inject TagsService
     */
    private readonly tagsService: TagsService,
  ) {}

  public async create(createPostDto: CreatePostDto) {
    // Find author from database based on authorId
    const author = await this.usersService.findOneById(createPostDto.authorId);
    // Check author existed?
    if (!author) {
      throw new NotFoundException('User not found');
    }
    // Find tags
    const tags = await this.tagsService.findMultipleTags(createPostDto.tags);
    // Create post
    const post = this.postsRepository.create({
      ...createPostDto,
      author: author,
      tags: tags,
    });
    // Return the post
    return await this.postsRepository.save(post);
  }

  public async update(patchPostsDto: PatchPostDto) {
    // Find the Tags
    const tags = await this.tagsService.findMultipleTags(patchPostsDto.tags);
    // Find the Post
    const post = await this.postsRepository.findOneBy({
      id: patchPostsDto.id,
    });
    if (!post) return null;
    // Update the properties
    post.title = patchPostsDto.title ?? post.title;
    post.content = patchPostsDto.content ?? post.content;
    post.status = patchPostsDto.status ?? post.status;
    post.postType = patchPostsDto.postType ?? post.postType;
    post.slug = patchPostsDto.slug ?? post.slug;
    post.featuredImageUrl =
      patchPostsDto.featuredImageUrl ?? post.featuredImageUrl;
    post.publishOn = patchPostsDto.publishOn ?? post.publishOn;
    // Assign the new tags
    post.tags = tags;
    // Save the post and return
    return await this.postsRepository.save(post);
  }

  public async findAll() {
    const posts = await this.postsRepository.find();
    return posts;
  }

  public async findPostbyID(id: number) {
    const posts = await this.postsRepository.findOneBy({ id });
    return posts;
  }

  public async delete(id: number) {
    await this.postsRepository.delete(id);

    return { deleted: true, id };
  }
}
