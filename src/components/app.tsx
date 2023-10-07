import { ClerkProvider, useAuth } from '@clerk/clerk-react';
import {
	ConvexReactClient,
	Authenticated,
	Unauthenticated,
	AuthLoading,
} from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { SignIn } from './sign-in';
import { Quiz } from './quiz';
import { User } from './user';

const convex = new ConvexReactClient(
	import.meta.env.PUBLIC_CONVEX_URL as string,
);

export const App = () => {
	return (
		<ClerkProvider
			publishableKey={import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY}
		>
			<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
				<User />
				<AuthLoading>
					<p style={{ textAlign: 'center' }}>shuffling the lists...</p>
				</AuthLoading>
				<Authenticated>
					<Quiz />
				</Authenticated>
				<Unauthenticated>
					<SignIn />
				</Unauthenticated>
			</ConvexProviderWithClerk>
		</ClerkProvider>
	);
};
