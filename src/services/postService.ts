import { postRepository } from "@/src/repositories/postRepository";
import type { Post, PaginatedPosts } from "@/src/types";

function serialize(post: {
  id: number;
  authorId: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}): Post {
  return {
    id: post.id,
    authorId: post.authorId,
    content: post.content,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  };
}

export const postService = {
  async getAllPosts(page = 1, limit = 10): Promise<PaginatedPosts> {
    const [posts, total] = await Promise.all([
      postRepository.findAll(page, limit),
      postRepository.countAll(),
    ]);

    return {
      data: posts.map(serialize),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  },

  async getPost(id: number): Promise<Post | null> {
    const post = await postRepository.findById(id);
    return post ? serialize(post) : null;
  },

  async createPost(data: { authorId: number; content: string }): Promise<Post> {
    const post = await postRepository.create({
      authorId: data.authorId,
      content: data.content,
    });
    return serialize(post);
  },

  async updatePost(
    id: number,
    data: { content?: string },
  ): Promise<Post | null> {
    const post = await postRepository.update(id, data);
    return post ? serialize(post) : null;
  },

  async deletePost(id: number): Promise<Post | null> {
    const post = await postRepository.delete(id);
    return post ? serialize(post) : null;
  },
};
