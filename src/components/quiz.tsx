import {
	ClerkProvider,
	SignInButton,
	SignOutButton,
	SignedIn,
	SignedOut,
	UserButton,
	useAuth,
	useUser,
} from '@clerk/clerk-react';
import { ConvexReactClient, useMutation, useQuery } from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { api } from '../../convex/_generated/api';
import { useEffect } from 'react';

const convex = new ConvexReactClient(
	import.meta.env.PUBLIC_CONVEX_URL as string,
);

const Header = () => {
	const { user, isLoaded } = useUser();
	const saveUser = useMutation(api.users.save);

	if (!user) {
		return null;
	}

	const convexUser = useQuery(api.users.get, {
		id: user.id,
	});

	useEffect(() => {
		console.log(convexUser);

		if (!convexUser && isLoaded && user.id) {
			saveUser({ id: user.id, username: user.username as string });
		}
	}, [isLoaded, user, convexUser]);

	return (
		<p>
			Welcome back, {user?.username} (user id {user?.id})!
		</p>
	);
};

export const QuizApp = () => {
	return (
		<ClerkProvider
			publishableKey={import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY}
		>
			<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
				<SignedIn>
					<Header />
					<h1>Signed In</h1>
					<UserButton />
					<SignOutButton />
				</SignedIn>
				<SignedOut>
					<h1>Signed Out</h1>
					<SignInButton />
				</SignedOut>
			</ConvexProviderWithClerk>
		</ClerkProvider>
	);
};
