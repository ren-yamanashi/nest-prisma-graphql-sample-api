import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { PostCreateInput } from './post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}
  async getAllPosts(): Promise<Post[]> {
    const posts = this.prisma.post.findMany({
      include: {
        author: true,
      },
    });
    if (!(await posts).length) throw new Error('投稿が見つかりませんでした');
    return posts;
  }

  async getPostById(id: number): Promise<Post | null> {
    if (!id) throw new Error('検索内容を入力してください');
    return this.prisma.post.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        author: true,
      },
    });
  }

  async getPublishedPosts(published: boolean): Promise<Post[] | null> {
    const posts = this.prisma.post.findMany({
      where: { published },
      include: {
        author: true,
      },
    });
    if (!posts) throw new Error('投稿が見つかりませんでした');
    return posts;
  }

  async getFilteredPosts(searchString: string): Promise<Post[] | null> {
    if (!searchString) throw new Error('検索内容を入力てください');
    const posts = this.prisma.post.findMany({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          {
            content: { contains: searchString },
          },
        ],
      },
      include: {
        author: true,
      },
    });
    if (!posts) throw new Error('投稿が見つかりませんでした');
    return posts;
  }

  async createPost(input: PostCreateInput): Promise<Post> {
    const { title, content, authorId, published } = input;
    if (!title) throw new Error('タイトルを入力してください');
    return this.prisma.post.create({
      data: {
        title,
        content,
        authorId,
        published,
      },
      include: {
        author: true,
      },
    });
  }
  async deletePost(id: number) {
    if (!id) throw new Error('削除する投稿が選択されていません');
    await this.prisma.post.delete({
      where: { id },
    });
    return true;
  }
}
