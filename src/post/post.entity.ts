import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../user/user.entity';

@ObjectType()
export class Post {
  @Field((type) => Int)
  id: number;

  @Field((type) => Boolean, { defaultValue: false, nullable: true })
  published?: string | null;

  @Field((type) => String)
  title: string;

  @Field((type) => String, { nullable: true })
  content?: string | null;

  @Field((type) => User, { nullable: true })
  author?: User | null;

  @Field((type) => Int)
  authorId?: number;
}
