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

@Controller('users')
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
  public getUserID(
    @Param() getUserParamDto: GetUsersParamDto,
    @Query('limit', new DefaultValuePipe(10)) limit: number,
  ) {
    return this.usersService.findAll(getUserParamDto, limit);
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
