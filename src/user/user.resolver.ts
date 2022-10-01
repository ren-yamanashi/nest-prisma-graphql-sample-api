import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UserCreateInput } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => User)
  signupUser(@Args('input') input: UserCreateInput) {
    return this.userService.signup(input);
  }
}
