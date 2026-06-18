export type Post = {
  id: number;
  authorId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type PaginatedPosts = {
  data: Post[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};
