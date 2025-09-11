import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  public getUsers() {
    return 'List of Users';
  }

  @Get('/:id/{:optional}')
  public getUserID(
    @Param('id', ParseIntPipe) id: number | undefined,
    @Param('optional') optional?: number,
    @Query('limit', ParseIntPipe) limit?: number,
  ) {
    console.log(typeof id);
    console.log(typeof limit);
    console.log(optional);
    if (optional) {
      return `ID is ${id} and optional parameter is ${optional}`;
    } else {
      return `ID is ${id} and no optional parameter`;
    }
  }

  @Post()
  public createUser(@Body() request: any) {
    console.log(request);
    return 'User created';
  }
}
