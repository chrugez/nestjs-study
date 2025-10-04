import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUsersParamDto } from './dtos/get-user-param.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}
  public findAll(getUsersParamDto: GetUsersParamDto, limit: number) {
    console.log(getUsersParamDto, limit);
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

  public findOneById(id: string) {
    return {
      id,
      firstName: 'Alice',
      email: 'alice@doe.com',
    };
  }
}
