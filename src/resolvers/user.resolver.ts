import { Args, Field, Int, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInputData, UpdateUserInputData } from 'dtos/user.dtos';
import { UserService } from 'services/user.service';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  username: string;

  @Field()
  email: string;
}

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User)
  async user(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  async createUser(@Args('createUserData') createUserInputData: CreateUserInputData) {
    return this.userService.create(createUserInputData);
  }

  @Mutation(() => User)
  async updateUser(@Args('id') id: number, @Args('updateUserData') updateUserInputData: UpdateUserInputData) {
    return this.userService.update(id, updateUserInputData);
  }

  @Mutation(() => User)
  async deleteUser(@Args('id') id: number) {
    return this.userService.delete(id);
  }
}
