import { act, renderHook } from '@testing-library/react';
import { useForm } from '../../src/hooks/useForm';

describe('test on useForm', () => {
	const initialForm = {
		name: 'jorge',
		email: 'test@test.com'
	};

	test('should return default values', () => {
		const { result } = renderHook(() => useForm(initialForm));

		expect(result.current).toEqual({
			name: 'jorge',
			email: 'test@test.com',
			formState: initialForm,
			onInputChange: expect.any(Function),
			onResetForm: expect.any(Function)
		});
	});

	test('should return new values', () => {
		const newUser = 'newUser';
		const { result } = renderHook(() => useForm(initialForm));
		const { onInputChange } = result.current;

		act(() => {
			onInputChange({ target: { name: 'name', value: newUser } });
		});

		expect(result.current.name).toBe('newUser');
		expect(result.current.formState.name).toBe('newUser');
	});

	test('should reset form', () => {
		const newUser = 'newUser';
		const { result } = renderHook(() => useForm(initialForm));
		const { onInputChange, onResetForm } = result.current;

		act(() => {
			onInputChange({ target: { name: 'name', value: newUser } });
			onResetForm();
		});

		expect(result.current.name).toBe(initialForm.name);
		expect(result.current.formState.name).toBe(initialForm.name);
	});
});
