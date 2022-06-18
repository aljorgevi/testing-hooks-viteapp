import { render, fireEvent, screen } from '@testing-library/react';
import { TodoApp } from '../08-useReducer/TodoApp';
import { useTodos } from '../hooks/useTodos';

jest.mock('../hooks/useTodos');

describe('test on <TodoApp />', () => {
	useTodos.mockReturnValue({
		todos: [
			{
				id: 1,
				description: 'Learn React',
				done: false
			},
			{
				id: 2,
				description: 'Learn Redux',
				done: false
			}
		],
		todosCount: 2,
		pendingTodosCount: 1,
		handleDeleteTodo: jest.fn(),
		handleToggleTodo: jest.fn(),
		handleNewTodo: jest.fn()
	});

	test('should render correctly', () => {
		render(<TodoApp />);

		expect(screen.getByText('Learn React')).toBeTruthy();
		expect(screen.getByText('Learn Redux')).toBeTruthy();
		expect(screen.getByRole('textbox')).toBeTruthy();
		// screen.debug();
	});
});
