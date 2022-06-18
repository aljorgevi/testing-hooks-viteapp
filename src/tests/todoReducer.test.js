import { todoReducer } from '../../src/08-useReducer/todoReducer';

describe('todoReducer test', () => {
	const initialState = [
		{
			id: 1,
			description: 'demo',
			done: false
		},
		{
			id: 2,
			description: 'demo2',
			done: false
		}
	];

	test('should return initial state', () => {
		const newState = todoReducer(initialState, {});
		expect(newState).toEqual(initialState);
	});

	test('should return new state with new todo', () => {
		const action = {
			type: '[TODO] Add Todo',
			payload: {
				id: 2,
				description: 'new todo',
				done: false
			}
		};

		// use toBe for primitives like strings, numbers or booleans for everything else use toEqual
		const newState = todoReducer(initialState, action);
		expect(newState).toContain(action.payload);
	});

	test('should remove a todo', () => {
		const action = {
			type: '[TODO] Remove Todo',
			payload: 1
		};

		const newState = todoReducer(initialState, action);
		expect(newState).not.toContain(initialState[0]);
	});

	test('should toggle a todo', () => {
		const action = {
			type: '[TODO] Toggle Todo',
			payload: 1
		};

		const newState = todoReducer(initialState, action);
		expect(newState[0].done).toBe(true);
	});
});
