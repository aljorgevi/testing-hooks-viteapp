import { fireEvent, render, screen } from '@testing-library/react';
import { MultipleCustomHooks } from '../../src/03-examples/MultipleCustomHooks';
import { useFetch } from '../../src/hooks/useFetch';
import { useCounter } from '../../src/hooks/useCounter';

jest.mock('../../src/hooks/useFetch');
jest.mock('../../src/hooks/useCounter');

describe('test on <MultipleCustomHooks />', () => {
	const mockIncrementFn = jest.fn();
	useCounter.mockReturnValue({ count: 1, increment: mockIncrementFn });

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should render without errors', () => {
		useFetch.mockReturnValue({
			data: null,
			isLoading: true,
			hasError: null
		});

		render(<MultipleCustomHooks />);

		expect(screen.getByText('Loading...'));
		expect(screen.getByText('BreakingBad Quotes'));
		const nextQuoteButton = screen.getByRole('button', { name: 'Next quote' });
		expect(nextQuoteButton.disabled).toBeTruthy();
		// screen.debug();
	});

	test('should show a quote', () => {
		// Arrange
		useFetch.mockReturnValue({
			data: [{ author: 'Jorge', quote: 'I am the one' }],
			isLoading: false,
			hasError: null
		});
		const { getByText, getByRole } = render(<MultipleCustomHooks />);

		// Act
		// .. nothing

		// Assert
		expect(getByText('I am the one')).toBeTruthy();
		expect(getByText('Jorge')).toBeTruthy();
		const nextQuoteButton = getByRole('button', { name: 'Next quote' });
		expect(nextQuoteButton.disabled).toBeFalsy();
		// screen.debug();
	});

	test('should call increment function', () => {
		// Arrange

		useFetch.mockReturnValue({
			data: [{ author: 'Jorge', quote: 'I am the one' }],
			isLoading: false,
			hasError: null
		});
		const { getByRole } = render(<MultipleCustomHooks />);
		const nextQuoteButton = getByRole('button', { name: 'Next quote' });

		// Act
		fireEvent.click(nextQuoteButton);

		// Assert
		expect(mockIncrementFn).toHaveBeenCalled();
		// screen.debug();
	});
});
