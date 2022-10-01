import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostCreateInput } from './post.dto';
import { Post } from './post.entity';
import { PostService } from './post.service';

@Resolver(Post)
export class PostResolver {
  constructor(private postService: PostService) {}

  /**
   * queries
   */

  // getAll
  @Query(() => [Post])
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  // getById
  @Query(() => Post, { nullable: true })
  getPostById(@Args('id') id: number) {
    return this.postService.getPostById(id);
  }

  //getByPublished
  @Query(() => [Post])
  getPublishedPosts(@Args('published') published: boolean) {
    return this.postService.getPublishedPosts(published);
  }

  // getBySearchString
  @Query(() => [Post])
  getFilteredPosts(@Args('searchString') searchString: string) {
    return this.postService.getFilteredPosts(searchString);
  }

  /**
   * mutations
   */

  // create
  @Mutation(() => Post)
  createPost(@Args('input') input: PostCreateInput) {
    return this.postService.createPost(input);
  }

  // delete
  @Mutation(() => Post)
  deletePost(@Args('id') id: number) {
    return this.postService.deletePost(id);
  }
}
