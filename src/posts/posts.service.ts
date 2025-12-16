import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOptions } from 'src/meta-options/meta-option.entity';

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
  ) {}

  public async create(createPostDto: CreatePostDto) {
    // Find author from database based on authorId
    const author = await this.usersService.findOneById(createPostDto.authorId);
    // Check author existed?
    if (!author) {
      throw new NotFoundException('User not found');
    }
    // Create post
    const post = this.postsRepository.create({
      ...createPostDto,
      author: author,
    });
    // Return the post
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
