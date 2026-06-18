import { db } from "@/src/db";
import { posts, type PostInsert, type PostSelect } from "@/src/db/schema";
import { eq, desc, count } from "drizzle-orm";

export const postRepository = {
  async findAll(page = 1, limit = 10): Promise<PostSelect[]> {
    return db
      .select()
      .from(posts)
      .orderBy(desc(posts.createdAt))
      .limit(limit)
      .offset((page - 1) * limit);
  },

  async countAll(): Promise<number> {
    const result = await db.select({ value: count() }).from(posts);
    return result[0].value;
  },

  async findById(id: number): Promise<PostSelect | null> {
    const result = await db.select().from(posts).where(eq(posts.id, id));
    return result[0] ?? null;
  },

  async create(data: PostInsert): Promise<PostSelect> {
    const result = await db.insert(posts).values(data).returning();
    return result[0];
  },

  async update(id: number, data: Partial<PostInsert>): Promise<PostSelect | null> {
    const result = await db
      .update(posts)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(posts.id, id))
      .returning();
    return result[0] ?? null;
  },

  async delete(id: number): Promise<PostSelect | null> {
    const result = await db.delete(posts).where(eq(posts.id, id)).returning();
    return result[0] ?? null;
  },
};
