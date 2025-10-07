import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { PatchUserDto } from './dtos/patch-user-dto';
import { UsersService } from './users.service';
import { GetUsersParamDto } from './dtos/get-user-param.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

/**
 * Use to control method of Users
 */
@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    // Inject Users Service
    private readonly usersService: UsersService,
  ) {}

  @Get()
  public getUsers() {
    return 'List of Users';
  }

  @Get('/:id')
  // @Get('/:id/{:optional}')
  @ApiOperation({
    summary: 'Fetches a list of users on the application',
  })
  @ApiResponse({
    status: 200,
    description: 'User fetched successfully based on the query',
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'The number of entries returned per query',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description:
      'The position of the page number that you want the API to return',
    example: 1,
  })
  public getUserID(
    @Param() getUserParamDto: GetUsersParamDto,
    @Query('limit', new DefaultValuePipe(10)) limit: number,
    @Query('page', new DefaultValuePipe(1)) page: number,
  ) {
    return this.usersService.findAll(getUserParamDto, limit, page);
  }

  @Post()
  public createUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return 'User created';
  }

  @Patch()
  public patchUser(@Body() patchUserDto: PatchUserDto) {
    console.log(patchUserDto);
    return patchUserDto;
  }
}
