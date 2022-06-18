import { render, screen } from '@testing-library/react';
import { UserContext } from '../09-useContext/context/UserContext';
import { HomePage } from '../09-useContext/HomePage';

describe('test on <HomePage />', () => {
	const mockUser = {
		id: 1,
		name: 'John Doe',
		email: 'test@test.com'
	};

	test('should show component without user', () => {
		render(
			<UserContext.Provider value={{ user: null }}>
				<HomePage />
			</UserContext.Provider>
		);

		const preTag = screen.getByLabelText('pre'); // arial-label
		expect(preTag.innerHTML).toBe('null');
		// screen.debug();
	});

	test('should show component with user', () => {
		render(
			<UserContext.Provider value={{ user: mockUser }}>
				<HomePage />
			</UserContext.Provider>
		);

		const preTag = screen.getByLabelText('pre');
		expect(preTag.innerHTML).toContain(mockUser.name);
		expect(preTag.innerHTML).toContain(mockUser.id.toString());
		expect(preTag.innerHTML).toBe(JSON.stringify(mockUser, null, 3));
	});
});
