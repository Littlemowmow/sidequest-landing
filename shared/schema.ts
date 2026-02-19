import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, serial, integer, jsonb, uniqueIndex } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const waitlistEntries = pgTable("waitlist_entries", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  destination: text("destination"),
  travelDate: text("travel_date"),
  travelType: text("travel_type").notNull().default("group"),
  university: text("university"),
  referralCode: text("referral_code").notNull(),
  referredBy: text("referred_by"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertWaitlistSchema = createInsertSchema(waitlistEntries).omit({
  id: true,
  createdAt: true,
});

export const waitlistRequestSchema = insertWaitlistSchema.omit({
  referralCode: true,
});

export type InsertWaitlistEntry = z.infer<typeof insertWaitlistSchema>;
export type WaitlistRequest = z.infer<typeof waitlistRequestSchema>;
export type WaitlistEntry = typeof waitlistEntries.$inferSelect;

export const polls = pgTable("polls", {
  id: serial("id").primaryKey(),
  shareCode: text("share_code").notNull().unique(),
  question: text("question").notNull(),
  options: text("options").array().notNull(),
  category: text("category").notNull().default("general"),
  createdBy: text("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const pollVotes = pgTable("poll_votes", {
  id: serial("id").primaryKey(),
  pollId: integer("poll_id").notNull().references(() => polls.id, { onDelete: "cascade" }),
  optionIndex: integer("option_index").notNull(),
  voterName: text("voter_name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  uniqueIndex("poll_voter_unique").on(table.pollId, table.voterName),
]);

export const insertPollSchema = createInsertSchema(polls).omit({
  id: true,
  createdAt: true,
  shareCode: true,
});

export const createPollRequestSchema = z.object({
  question: z.string().min(1).max(200),
  options: z.array(z.string().min(1).max(100)).min(2).max(8),
  category: z.enum(["meal", "activity", "destination", "time", "general"]).default("general"),
  createdBy: z.string().min(1).max(50),
});

export const castVoteSchema = z.object({
  optionIndex: z.number().int().min(0),
  voterName: z.string().min(1).max(50),
});

export type Poll = typeof polls.$inferSelect;
export type InsertPoll = z.infer<typeof insertPollSchema>;
export type PollVote = typeof pollVotes.$inferSelect;
