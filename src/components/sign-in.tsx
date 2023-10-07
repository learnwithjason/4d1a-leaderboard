import { SignInButton } from '@clerk/clerk-react';

export const SignIn = () => {
	return (
		<>
			<h1>How fast can you put these lists in order?</h1>
			<p>
				The List Game is the perfect distraction if you’re trying to avoid
				dealing with your email or doing that project that’s due this week. What
				better way to put off work than by doing voluntary internet research on
				information you will probably never need to care about while under time
				pressure?
			</p>
			<p>
				It’s like those job simulator games, but instead of fun graphics or a
				cute storyline, you’re just doing research to figure out what order the
				items in a list should be in.
			</p>
			<h2>Sound like fun? Sign in to get started!</h2>
			<p>
				Signing in allows us to keep track of your score. Only your username
				will be stored and none of your other information will be shared or
				sold.
			</p>
			<SignInButton />
		</>
	);
};
