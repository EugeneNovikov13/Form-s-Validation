import { useState } from 'react';

const initialState = {
	email: '',
	password: '',
	passwordRepeat: '',
};

const initialErrorState = {
	emailError: '',
	passwordError: '',
	passwordRepeatError: '',
};

export const useStore = () => {
	const [state, setState] = useState(initialState);
	const [errors, setErrors] = useState(initialErrorState);

	return {
		getState: () => state,
		getErrors: () => errors,
		updateState: (fieldName, newValue) => {
			setState({ ...state, [fieldName]: newValue });
		},
		updateErrorsState: (fieldName, newValue) => {
			setErrors({ ...errors, [fieldName]: newValue });
		},
		resetState: () => {
			setState(initialState);
			setErrors(initialErrorState);
		},
	};
};
