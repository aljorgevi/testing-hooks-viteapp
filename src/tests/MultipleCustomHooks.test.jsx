import { render, screen } from '@testing-library/react';
import { MultipleCustomHooks } from '../../src/03-examples/MultipleCustomHooks';

describe('test on <MultipleCustomHooks />', () => {
	test('should render without errors', () => {
		render(<MultipleCustomHooks />);

		expect(screen.getByText('Loading...'));
		expect(screen.getByText('BreakingBad Quotes'));
		const nextButton = screen.getByRole('button', { name: 'Next quote' });
		expect(nextButton.disabled).toBeTruthy();
		// screen.debug();
	});
});
