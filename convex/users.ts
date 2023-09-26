import { mutation, query } from './_generated/server';
import { UserSchema } from './schema';

export const save = mutation({
	args: UserSchema,
	handler: async (ctx, { id, username }) => {
		return await ctx.db.insert('users', { id, username });
	},
});

export const get = query({
	args: { id: UserSchema.id },
	handler: async (ctx, args) => {
		return await ctx.db
			.query('users')
			.filter((q) => q.eq(q.field('id'), args.id))
			.first();
	},
});
