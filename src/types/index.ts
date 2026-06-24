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

export type User = {
  username: string;
  email: string;
  profileImageUrl: string | null;
  phoneNumber: string | null;
  createdAt: string;
  updatedAt: string;
};

export type RegisterInput = {
  username: string;
  email: string;
  password: string;
  phoneNumber?: string;
};

export type LoginInput = {
  identifier: string;
  password: string;
};
