import { ClerkProvider, useAuth, useUser } from '@clerk/clerk-react';
import { ConvexReactClient, useQuery } from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { api } from '../../convex/_generated/api';
import styles from './leaderboard.module.css';
import { User } from './user';

const convex = new ConvexReactClient(
	import.meta.env.PUBLIC_CONVEX_URL as string,
);

const Scores = () => {
	const { user } = useUser();
	const scores = useQuery(api.scores.getAll);

	return (
		<ol className={styles.scoreList}>
			{scores?.map((score) => {
				const classes = [styles.score];

				if (score.username === user?.username) {
					classes.push(styles.me);
				}

				return (
					<li key={score._id} className={classes.join(' ')}>
						{user?.hasImage ? (
							<img src={user.imageUrl} alt={user.fullName ?? score.username} />
						) : null}
						<span className={styles.name}>{score.username}</span>
						<span className={styles.time}>
							{(score.time / 1000).toFixed(1)} seconds
						</span>
					</li>
				);
			})}
		</ol>
	);
};

export const Leaderboard = () => {
	return (
		<ClerkProvider
			publishableKey={import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY}
		>
			<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
				<User />
				<Scores />
			</ConvexProviderWithClerk>
		</ClerkProvider>
	);
};
