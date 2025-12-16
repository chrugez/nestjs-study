import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    //Injecting UserService
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  public login(email: string, password: string, id: number) {
    // Check user exists database
    const user = this.usersService.findOneById(id);
    console.log(user);
    // login
    // token
    return 'SAMPLE_TOKEN';
  }

  public isAuth() {
    return true;
  }
}
