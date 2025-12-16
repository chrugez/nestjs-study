import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUsersParamDto } from './dtos/get-user-param.dto';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

/**
 * Class to connect to Users table and perform business operations
 */
@Injectable()
export class UsersService {
  /**
   * Dependency injection authService
   * Dependency injection usersRepository
   * @param authService
   */
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    // Check is user exists with the same email
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
    console.log(existingUser);
    // Handle exception
    // Create a new user
    let newUser = this.usersRepository.create(createUserDto);
    newUser = await this.usersRepository.save(newUser);

    return newUser;
  }

  /**
   * The method to get all the users from database
   * @param getUsersParamDto
   * @param limit
   * @param page
   * @returns
   */
  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    console.log(getUsersParamDto, limit, page);
    const isAuth = this.authService.isAuth();
    console.log(isAuth);
    return [
      {
        firstName: 'Chung',
        email: 'chung@gmail.com',
      },
      {
        firstName: 'Hung',
        email: 'hung@gmail.com',
      },
    ];
  }

  /**
   * The method to get all the user by id from database
   * @param id
   * @returns
   */
  public async findOneById(id: number) {
    return await this.usersRepository.findOneBy({
      id,
    });
  }
}
