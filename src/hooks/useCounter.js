import { useState } from 'react';

export const useCounter = (initialValue = 10) => {
	const [counter, setCounter] = useState(initialValue);

	const increment = (value = 1) => {
		setCounter(prevState => prevState + value);
	};

	const decrement = (value = 1) => {
		// if ( counter === 0 ) return;

		setCounter(prevState => prevState - value);
	};

	const reset = () => {
		setCounter(initialValue);
	};

	return {
		counter,
		increment,
		decrement,
		reset
	};
};
