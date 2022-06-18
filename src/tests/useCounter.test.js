import { renderHook, act } from '@testing-library/react';
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

	test('test should increment', () => {
		const { result } = renderHook(() => useCounter());
		const { increment } = result.current;

		act(() => {
			increment();
			increment(2);
		});

		expect(result.current.counter).toBe(13);
	});

	test('test should decrement', () => {
		const { result } = renderHook(() => useCounter());
		const { decrement } = result.current;

		act(() => {
			decrement();
			decrement(2);
		});

		expect(result.current.counter).toBe(7);
	});

	test('test should reset', () => {
		const { result } = renderHook(() => useCounter());
		const { increment, decrement, reset } = result.current;

		act(() => {
			increment();
			increment(2);
			decrement();
			reset();
		});

		expect(result.current.counter).toBe(10);
	});
});
