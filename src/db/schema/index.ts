import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  authorId: integer("author_id").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const users = pgTable("users", {
  username: text("username").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  profileImageUrl: text("profile_image_url"),
  phoneNumber: text("phone_number"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export type PostSelect = typeof posts.$inferSelect;
export type PostInsert = typeof posts.$inferInsert;

export type UserSelect = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;
