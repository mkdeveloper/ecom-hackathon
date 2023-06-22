import { pgTable, integer, varchar, serial } from "drizzle-orm/pg-core";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { InferModel } from "drizzle-orm";

export const cartTable = pgTable("cart", {
  id: serial("id").primaryKey().notNull(),
  user_id: varchar("user_id", { length: 255 }).notNull(),
  product_id: varchar("product_id", { length: 255 }).notNull(),
  product_name: varchar("product_name", { length: 255 }).notNull(),
  subcat: varchar("subcat", { length: 255 }).notNull(),
  image: varchar("image", { length: 255 }).notNull(),
  price: integer("price").notNull(),
  quantity: integer("quantity").notNull(),
});

export type Cart = InferModel<typeof cartTable>;
export type addToCart = InferModel<typeof cartTable, "insert">; // insert type

export const db = drizzle(sql);
