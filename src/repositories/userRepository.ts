import { db } from "@/src/db";
import { users, type UserSelect, type UserInsert } from "@/src/db/schema";
import { eq, or } from "drizzle-orm";

export const userRepository = {
  async findByUsername(username: string): Promise<UserSelect | null> {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.username, username));
    return result[0] ?? null;
  },

  async findByEmail(email: string): Promise<UserSelect | null> {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    return result[0] ?? null;
  },

  async findByUsernameOrEmail(identifier: string): Promise<UserSelect | null> {
    const result = await db
      .select()
      .from(users)
      .where(or(eq(users.username, identifier), eq(users.email, identifier)));
    return result[0] ?? null;
  },

  async create(data: UserInsert): Promise<UserSelect> {
    const result = await db.insert(users).values(data).returning();
    return result[0];
  },

  async update(
    username: string,
    data: Partial<UserInsert>,
  ): Promise<UserSelect | null> {
    const result = await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.username, username))
      .returning();
    return result[0] ?? null;
  },
};
