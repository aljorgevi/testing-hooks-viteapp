import { fireEvent, render, screen } from '@testing-library/react';
import { LoginPage } from '../09-useContext/LoginPage';
import { UserContext } from '../09-useContext/context/UserContext';

describe('test on <LoginPage />', () => {
	const mockUser = {
		id: 1,
		name: 'John Doe',
		email: 'test@test.com'
	};

	const setUser = jest.fn();

	test('test loginPage renders', () => {
		const { getByText } = render(
			<UserContext.Provider value={{ user: null }}>
				<LoginPage />
			</UserContext.Provider>
		);

		expect(getByText('LoginPage')).toBeTruthy();
		// screen.debug();
	});

	test('should show component without user', () => {
		render(
			<UserContext.Provider value={{ user: null, setUser }}>
				<LoginPage />
			</UserContext.Provider>
		);

		const preTag = screen.getByLabelText('pre');
		expect(preTag.innerHTML).toBe('null');
	});

	test('should call setUser when click on button', () => {
		const { getByText } = render(
			<UserContext.Provider value={{ user: null, setUser }}>
				<LoginPage />
			</UserContext.Provider>
		);

		const $button = getByText('create user');
		fireEvent.click($button);

		expect(setUser).toBeCalledWith(mockUser);
	});
});
