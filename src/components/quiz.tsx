import { useEffect, useRef, useState } from 'react';
import { useMachine } from '@xstate/react';
import { useUser } from '@clerk/clerk-react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { gameMachine } from '../game-machine';

import styles from './quiz.module.css';

/*
 * TODO:
 * - reset the scores table
 */

const StartScreen = ({ startGame }: { startGame: () => void }) => {
	const { user } = useUser();

	return (
		<>
			<h1 className={styles.instructions}>
				Get ready to play, {user?.firstName}!
			</h1>
			<p className={styles.instructions}>
				Once you click the start button, the timer starts running.
			</p>
			<button onClick={() => startGame()}>Start!</button>{' '}
			<p className={styles.instructions}>
				<a href="/leaderboard">or view the leaderboard</a>
			</p>
		</>
	);
};

const Playing = ({
	question,
	updateOrder,
	checkAnswer,
	showError,
}: {
	question: any;
	updateOrder: (newOrder: number[]) => void;
	checkAnswer: () => void;
	showError: boolean;
}) => {
	const button = useRef<HTMLButtonElement>(null);
	const sortable = useRef<HTMLOListElement>(null);

	/**
	 * this borrows heavily from some code @argyleink wrote:
	 * @see https://codepen.io/argyleink/pen/rNQZbLr?editors=0011
	 */
	useEffect(() => {
		const drag: {
			src: HTMLLIElement | null;
			items: HTMLLIElement[];
		} = {
			src: null,
			items: Array.from(sortable.current!.querySelectorAll(':scope > li')),
		};

		const rearrangeItems = (
			draggedEl: HTMLLIElement,
			dropTargetEl: HTMLLIElement,
		) => {
			const currentIndex = drag.items.findIndex((x) => x === draggedEl);
			const nextIndex = drag.items.findIndex((x) => x === dropTargetEl);

			const originalElRemoved = drag.items.toSpliced(currentIndex, 1);
			const updatedElOrder = originalElRemoved.toSpliced(
				nextIndex,
				0,
				draggedEl,
			);

			drag.items = updatedElOrder;

			updateOrder(drag.items.map((x) => Number(x.dataset['key'])));

			sortable.current?.replaceChildren(...drag.items);
		};

		const handleDrop: EventListener = (e) => {
			e.stopPropagation();

			if (drag.src === null) {
				return;
			}

			const item = e.target as HTMLLIElement;

			if (drag.src !== item) {
				// @ts-expect-error this API isn't in every browser yet
				if (document.startViewTransition) {
					// @ts-expect-error this API isn't in every browser yet
					document.startViewTransition(() => {
						rearrangeItems(drag.src!, item);
					});
				} else {
					rearrangeItems(drag.src, item);
				}
			}
		};

		const handleDragStart: EventListener = (e) => {
			const item = e.target as HTMLLIElement;

			requestAnimationFrame(() => {
				item.style.opacity = '.4';
			});

			drag.src = item;
		};

		const handleDragOver: EventListener = (e) => {
			e.preventDefault();
		};

		const handleDragEnter: EventListener = (e) => {
			const item = e.target as HTMLLIElement;

			item.classList.add(styles.over);
		};

		const handleDragLeave: EventListener = (e) => {
			const item = e.target as HTMLLIElement;

			item.classList.remove(styles.over);
		};

		const handleDragEnd: EventListener = (e) => {
			const item = e.target as HTMLLIElement;

			item.style.opacity = '1';

			drag.items.forEach((item) => {
				item.classList.remove(styles.over);
			});
		};

		drag.items.forEach((item) => {
			item.addEventListener('dragstart', handleDragStart, false);
			item.addEventListener('dragenter', handleDragEnter, false);
			item.addEventListener('dragover', handleDragOver, false);
			item.addEventListener('dragleave', handleDragLeave, false);
			item.addEventListener('drop', handleDrop, false);
			item.addEventListener('dragend', handleDragEnd, false);
		});

		() => {
			drag.items = [];
			drag.src = null;
		};
	}, [question]);

	useEffect(() => {
		if (!showError) {
			button.current?.classList.remove(styles.error);
			return;
		}

		button.current?.classList.add(styles.error);
	}, [showError]);

	return (
		<>
			<h1 className={styles.instructions}>{question.instructions}</h1>
			<button onClick={() => checkAnswer()} ref={button}>
				Check Answer
			</button>
			<ol className={styles.answers} ref={sortable}>
				{question.answers.map(
					(a: { id: number; label: string; img: string }) => (
						<li
							className={styles.answer}
							draggable={true}
							key={a.id}
							data-key={a.id}
							style={{
								viewTransitionName: `answer${a.id}`,
							}}
						>
							<img src={a.img} alt={a.label} />
							{a.label}
						</li>
					),
				)}
			</ol>
		</>
	);
};

const Finished = ({
	startTime,
	finishTime,
}: {
	startTime: number;
	finishTime: number;
}) => {
	const { user } = useUser();
	const [score, setScore] = useState('');
	const saveScore = useMutation(api.scores.save);

	useEffect(() => {
		const time = finishTime - startTime;

		if (!user?.username) {
			throw new Error('how did you get here?');
		}

		saveScore({ username: user.username, time });

		setScore((time / 1000).toFixed(1));
	}, []);

	return (
		<>
			<h1 className={styles.instructions}>
				Dang, {user?.firstName}, you sorted the h*ck out of those lists!
			</h1>
			<p className={styles.instructions}>Everything is in order now.</p>
			<h2 className={styles.instructions}>You finished in {score} seconds!</h2>
			<p className={styles.instructions}>
				<a href="/leaderboard" className={styles.button}>
					View the leaderboard
				</a>
			</p>
		</>
	);
};

export const Quiz = () => {
	const [state, send] = useMachine(gameMachine);

	if (state.value === 'start') {
		return <StartScreen startGame={() => send({ type: 'game.start' })} />;
	}

	if (state.value === 'ordering' || state.value === 'error') {
		const question = state.context.questions.at(state.context.currentQuestion);

		return (
			<Playing
				question={question}
				updateOrder={(newOrder) => {
					send({ type: 'order.change', order: newOrder });
				}}
				checkAnswer={() => send({ type: 'answer.check' })}
				showError={state.context.orderIncorrect}
			/>
		);
	}

	if (state.value === 'finished') {
		if (!state.context.startTime || !state.context.finishTime) {
			throw new Error('start and end times are required to finish');
		}

		return (
			<Finished
				startTime={state.context.startTime}
				finishTime={state.context.finishTime}
			/>
		);
	}

	return (
		<>
			<pre>{JSON.stringify(state, null, 2)}</pre>
		</>
	);
};
