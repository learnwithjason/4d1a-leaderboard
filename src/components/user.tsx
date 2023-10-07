import { UserButton } from '@clerk/clerk-react';
import { Authenticated } from 'convex/react';
import styles from './user.module.css';

export const User = () => {
	return (
		<Authenticated>
			<div className={styles.user}>
				<UserButton afterSignOutUrl="/" />
			</div>
		</Authenticated>
	);
};
