import { createMachine, assign } from 'xstate';

const questions = [
	{
		instructions:
			'Put these singles in the order they appeared on the Billboard Hot 100 Year-End chart.',
		answers: [
			{
				id: 1,
				label: 'Lights by Ellie Goulding',
				img: 'https://upload.wikimedia.org/wikipedia/en/d/d6/Lights_Ellie_Single.PNG',
				correctOrder: 4,
			},
			{
				id: 2,
				label: 'Somebody That I Used To Know by Gotye featuring Kimbra',
				img: 'https://i.scdn.co/image/ab67616d0000b273e1d47c00ddecbfb810c807ed',
				correctOrder: 0,
			},
			{
				id: 3,
				label: 'We Are young by Fun. featuring Janelle Monáe',
				img: 'https://m.media-amazon.com/images/M/MV5BYzRhOTMwNTQtOTE0Mi00MzlkLWEzODEtZGQ0OGEyMDM2MjM5XkEyXkFqcGdeQXVyNTMyODM3MTg@._V1_QL75_UX190_CR0,0,190,190_.jpg',
				correctOrder: 2,
			},
			{
				id: 4,
				label: 'Payphone by Maroon 5 featuring Wiz Khalifa',
				img: 'https://upload.wikimedia.org/wikipedia/en/7/7f/Maroon_5_Payphone_cover.png',
				correctOrder: 3,
			},
			{
				id: 5,
				label: 'Call Me Maybe by Carly Rae Jepsen',
				img: 'https://upload.wikimedia.org/wikipedia/en/a/ad/Carly_Rae_Jepsen_-_Call_Me_Maybe.png',
				correctOrder: 1,
			},
		],
	},
	{
		instructions:
			'Put these foods in order of fiber content per 100g (highest first)',
		answers: [
			{
				id: 1,
				label: 'Black beans',
				img: 'https://images.unsplash.com/photo-1580979443662-13a976bd7632?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80',
				correctOrder: 4,
			},
			{
				id: 2,
				label: 'Avocado',
				img: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZvY2Fkb3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&h=400&q=60',
				correctOrder: 5,
			},
			{
				id: 3,
				label: 'Lentils',
				img: 'https://images.unsplash.com/photo-1552585960-0e1069ce7405?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGVudGlsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&h=400&q=60',
				correctOrder: 3,
			},
			{
				id: 4,
				label: 'Chia Seeds',
				img: 'https://images.unsplash.com/photo-1620429194563-f97cffd3fa6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80',
				correctOrder: 1,
			},
			{
				id: 5,
				label: 'Popcorn',
				img: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9wY29ybnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&h=400&q=60',
				correctOrder: 2,
			},
		],
	},
	{
		instructions:
			'Put these TV shows in order of the year they first aired (oldest first)',
		answers: [
			{
				id: 1,
				label: 'Black-ish',
				img: 'https://resizing.flixster.com/xmCD2uqWkkMEA6J4RW4fghKGGnU=/206x305/v2/https://flxt.tmsimg.com/assets/p10777519_b_v13_bb.jpg',
				correctOrder: 3,
			},
			{
				id: 2,
				label: '30 Rock',
				img: 'https://resizing.flixster.com/B-Tp3m1GhrqZTjqYG_2qIRQUwIE=/206x305/v2/https://flxt.tmsimg.com/assets/p185203_b_v8_ac.jpg',
				correctOrder: 1,
			},
			{
				id: 3,
				label: 'The Good Place',
				img: 'https://resizing.flixster.com/On4-hd2qS2tV0zj5pzysL7fLW9A=/206x305/v2/https://flxt.tmsimg.com/assets/p12510467_b_v13_af.jpg',
				correctOrder: 4,
			},
			{
				id: 4,
				label: 'Abbott Elementary',
				img: 'https://resizing.flixster.com/wFVXCGEnoHoxnALjrGDvjE4nLsw=/206x305/v2/https://resizing.flixster.com/IgssURMPLBesN2OrY_kDOrBHKII=/ems.cHJkLWVtcy1hc3NldHMvdHZzZXJpZXMvOTIxNDZmMDQtYzk1Yi00MTA5LTkzZTMtYzZmODA1MWZiM2MzLmpwZw==',
				correctOrder: 5,
			},
			{
				id: 5,
				label: 'Parks and Recreation',
				img: 'https://resizing.flixster.com/CqigEP_xwlqF4qqzdSMb1niPmRw=/206x305/v2/https://flxt.tmsimg.com/assets/p194833_b_v8_ae.jpg',
				correctOrder: 2,
			},
		],
	},
	{
		instructions:
			'Put these paintings in order from most expensive to least expensive',
		answers: [
			{
				id: 1,
				label: 'Interchange by Willem de Kooning',
				img: 'https://upload.wikimedia.org/wikipedia/en/5/5f/Photo_of_Interchanged_by_Willem_de_Kooning.jpg',
				correctOrder: 2,
			},
			{
				id: 2,
				label: 'Salvator Mundi by Leonardo Da Vinci',
				img: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Leonardo_da_Vinci%2C_Salvator_Mundi%2C_c.1500%2C_oil_on_walnut%2C_45.4_%C3%97_65.6_cm.jpg',
				correctOrder: 1,
			},
			{
				id: 3,
				label: 'Nafea faa ipoipo? by Paul Gauguin',
				img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Paul_Gauguin%2C_Nafea_Faa_Ipoipo%3F_1892%2C_oil_on_canvas%2C_101_x_77_cm.jpg/500px-Paul_Gauguin%2C_Nafea_Faa_Ipoipo%3F_1892%2C_oil_on_canvas%2C_101_x_77_cm.jpg',
				correctOrder: 4,
			},
			{
				id: 4,
				label: 'The Card Players by Paul Cézanne',
				img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Les_Joueurs_de_cartes%2C_par_Paul_C%C3%A9zanne.jpg/520px-Les_Joueurs_de_cartes%2C_par_Paul_C%C3%A9zanne.jpg',
				correctOrder: 3,
			},
			{
				id: 5,
				label: 'Number 17A by Jackson Pollock',
				img: 'https://upload.wikimedia.org/wikipedia/en/f/f2/Number_17A.jpg',
				correctOrder: 5,
			},
		],
	},
];

function isCorrectOrder(
	arr1: number[],
	arr2: { id: number; correctOrder: number }[],
) {
	return (
		arr1.join('') ===
		arr2
			.toSorted((a, b) => a.correctOrder - b.correctOrder)
			.map(({ id }) => id)
			.join('')
	);
}

export const gameMachine = createMachine(
	{
		types: {} as {
			context: {
				questions: {
					instructions: string;
					answers: { id: number; label: string; correctOrder: number }[];
				}[];
				currentQuestion: number;
				currentOrder: number[];
				orderIncorrect: boolean;
				startTime: number | null;
				finishTime: number | null;
			};
		},
		context: {
			questions,
			currentQuestion: 0,
			currentOrder: questions.at(0)!.answers.map((a) => a.id),
			orderIncorrect: false,
			startTime: null,
			finishTime: null,
		},
		initial: 'start',
		states: {
			start: {
				on: {
					'game.start': {
						target: 'ordering',
						actions: ['startTimer'],
					},
				},
			},
			finished: {
				entry: 'saveScore',
				type: 'final',
			},
			ordering: {
				on: {
					'answer.check': [
						{
							guard: 'orderCorrect',
							actions: ['nextQuestion'],
						},
						{
							guard: 'orderIncorrect',
							target: 'error',
						},
					],
					'order.change': {
						actions: ['updateOrder'],
					},
				},
				always: {
					guard: 'allQuestionsAnswered',
					target: 'finished',
				},
			},
			error: {
				entry: 'showError',
				after: {
					500: {
						target: 'ordering',
						actions: ['hideError'],
					},
				},
			},
		},
	},
	{
		guards: {
			orderCorrect: ({ context }) => {
				return isCorrectOrder(
					context.currentOrder,
					context.questions[context.currentQuestion].answers,
				);
			},
			orderIncorrect: ({ context }) => {
				return !isCorrectOrder(
					context.currentOrder,
					context.questions[context.currentQuestion].answers,
				);
			},
			allQuestionsAnswered: ({ context }) => {
				return context.currentQuestion >= context.questions.length;
			},
		},
		actions: {
			startTimer: assign({
				startTime: () => Date.now(),
			}),
			saveScore: assign({
				finishTime: () => Date.now(),
			}),
			updateOrder: assign({
				currentOrder: ({ context, event }) => {
					if (event.order) {
						return event.order;
					}

					return context.currentOrder;
				},
			}),
			showError: assign({
				orderIncorrect: true,
			}),
			hideError: assign({
				orderIncorrect: false,
			}),
			nextQuestion: assign({
				currentOrder: ({ context }) =>
					context.questions
						.at(context.currentQuestion + 1)
						?.answers.map((a) => a.id) ?? [],
				currentQuestion: ({ context }) => context.currentQuestion + 1,
				orderIncorrect: false,
			}),
		},
	},
);
