import { render, fireEvent, screen } from '@testing-library/react';
import { TodoItem } from '../08-useReducer/TodoItem';

describe('test <TodoItem />', () => {
	const todoTask = {
		id: 1,
		description: 'Learn React',
		done: false
	};

	const todoTaskComplete = {
		id: 1,
		description: 'Learn React',
		done: true
	};

	const onDeleteTodoMock = jest.fn();
	const onToggleTodoMock = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should show todo pending by default', () => {
		render(
			<TodoItem todo={todoTask} onDeleteTodo={onDeleteTodoMock} onToggleTodo={onToggleTodoMock} />
		);
		const $li = screen.getByRole('listitem');
		const $span = screen.getByLabelText('span');

		expect($li.className).toBe('list-group-item d-flex justify-content-between');
		expect($span.className).toContain('align-self-center');
	});

	test('should return todo done', () => {
		render(
			<TodoItem
				todo={todoTaskComplete}
				onDeleteTodo={onDeleteTodoMock}
				onToggleTodo={onToggleTodoMock}
			/>
		);
		const $span = screen.getByLabelText('span');

		expect($span.className).toContain('text-decoration-line-through');
	});

	test('span should call onToggleTodo', () => {
		render(
			<TodoItem
				todo={todoTaskComplete}
				onDeleteTodo={onDeleteTodoMock}
				onToggleTodo={onToggleTodoMock}
			/>
		);

		const $span = screen.getByLabelText('span');
		fireEvent.click($span);

		expect(onToggleTodoMock).toHaveBeenCalledWith(todoTaskComplete.id);
	});

	test('button should call onDeleteTodo', () => {
		render(
			<TodoItem
				todo={todoTaskComplete}
				onDeleteTodo={onDeleteTodoMock}
				onToggleTodo={onToggleTodoMock}
			/>
		);

		const $button = screen.getByRole('button');
		fireEvent.click($button);

		expect(onDeleteTodoMock).toHaveBeenCalledWith(todoTaskComplete.id);
	});
});
