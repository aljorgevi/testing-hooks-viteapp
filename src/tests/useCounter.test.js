import { renderHook } from '@testing-library/react';
import { useCounter } from '../../src/hooks/useCounter';

describe('useCounter', () => {
	test('test should return default values', () => {
		const { result } = renderHook(() => useCounter());
		const { counter, decrement, increment, reset } = result.current;

		expect(counter).toBe(10);
		expect(typeof decrement).toBe('function');
		expect(typeof increment).toBe('function');
		expect(typeof reset).toBe('function');
	});

	test('test should return custom values', () => {
		const { result } = renderHook(() => useCounter(100));
		const { counter } = result.current;

		expect(counter).toBe(100);
	});
});
