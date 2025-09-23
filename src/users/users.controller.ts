import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  @Get()
  public getUsers() {
    return 'List of Users';
  }

  @Get('/:id')
  @Get('/:id/{:optional}')
  public getUserID(
    @Param('id', ParseIntPipe) id: number | undefined,
    @Param('optional') optional?: number,
    @Query('limit', new DefaultValuePipe(10)) limit?: number,
  ) {
    console.log(typeof id, id);
    console.log(typeof limit, limit);
    console.log(optional);
    if (optional) {
      return `ID is ${id} and optional parameter is ${optional}`;
    } else {
      return `ID is ${id} and no optional parameter`;
    }
  }

  @Post()
  public createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return 'User created';
  }
}
