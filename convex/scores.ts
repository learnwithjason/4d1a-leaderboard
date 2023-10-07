import { mutation, query } from './_generated/server';
import { ScoresSchema } from './schema';

export const save = mutation({
	args: ScoresSchema,
	handler: async (ctx, args) => {
		return await ctx.db.insert('scores', args);
	},
});

export const getAll = query({
	handler: async (ctx) => {
		return await ctx.db
			.query('scores')
			.withIndex('by_time', (q) => q)
			.order('asc')
			.take(10);
	},
});
