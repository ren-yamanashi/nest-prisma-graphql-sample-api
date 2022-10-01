import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PostCreateInput {
  @Field()
  title: string;

  @Field()
  content: string;

  @Field()
  authorId: number;

  @Field()
  published?: boolean;
}

@InputType()
export class PostUpdateInput {
  @Field()
  title?: string;

  @Field()
  content?: string;

  @Field()
  published?: boolean;
}
