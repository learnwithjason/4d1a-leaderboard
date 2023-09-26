import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export const UserSchema = {
	id: v.string(), // should map to Clerk
	username: v.string(),
};

export default defineSchema({
	users: defineTable(UserSchema),
	scores: defineTable({
		id: v.string(),
		user_id: v.id('users'),
		time: v.number(),
	}),
});
