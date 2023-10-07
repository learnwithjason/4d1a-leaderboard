import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export const ScoresSchema = {
	username: v.string(),
	time: v.number(),
};

export default defineSchema({
	scores: defineTable(ScoresSchema).index('by_time', ['time']),
});
