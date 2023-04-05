import { Args, Field, Int, Mutation, ObjectType, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

@ObjectType()
export class Author {
  @Field((type) => Int)
  id: number;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field((type) => [Post])
  posts: Post[];
}

@ObjectType()
export class Post {
  @Field((type) => Int)
  id: number;

  @Field()
  title: string;

  @Field((type) => Int, { nullable: true })
  votes?: number;
}

@Resolver((of) => Author)
export class AuthorsResolver {
  constructor() {}

  @Query((returns) => Author)
  async author(@Args('id', { type: () => Int }) id: number) {
    return authors.find((author) => author.id === id);
  }

  @ResolveField()
  async posts(@Parent() author: Author) {
    const { id } = author;
    return authors.find((author) => author.id === id).posts;
  }

  @Mutation((returns) => Post)
  async upvotePost(@Args({ name: 'postId', type: () => Int }) postId: number) {
    let foundPost: Post;
    posts = posts.map((post) => {
      if (post.id === postId) {
        post.votes += 1;
        foundPost = post;
      }
      return post;
    });

    return foundPost;
  }
}

let posts: Array<Post> = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  title: `Post #${i}`,
  votes: i * 10
}));

const authors: Array<Author> = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  firstName: `Author #${i}`,
  lastName: `Last Name #${i}`,
  posts: posts.filter((post) => post.id % 2 === 0)
}));
