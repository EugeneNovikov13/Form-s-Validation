import { useRef, useEffect } from 'react';
import { useStore } from './hooks/useStore';
import styles from './app.module.css';

const sendData = data => {
	console.log(data);
};

export const App = () => {
	const { getState, getErrors, updateState, updateErrorsState, resetState } =
		useStore();

	const { email, password, passwordRepeat } = getState();

	const { emailError, passwordError, passwordRepeatError } = getErrors();

	const formError = Object.values(getErrors()).some(el => el);

	const emailRef = useRef(null);

	const submitButtonRef = useRef(null);

	useEffect(() => {
		if (
			/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email) &&
			/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/g.test(password) &&
			password === passwordRepeat &&
			!formError
		)
			submitButtonRef.current.focus();
	}, [email, password, passwordRepeat, formError]);

	const onSubmit = event => {
		event.preventDefault();
		sendData(getState());
		resetState();
		emailRef.current.focus();
	};

	const onChange = ({ target }) => {
		updateState(target.name, target.value);

		switch (target.name) {
			case 'email': {
				!/^[\w\-@.]*$/.test(target.value)
					? updateErrorsState(
							'emailError',
							'Допустимы только латинские буквы, цифры и _ . - @',
					  )
					: updateErrorsState('emailError', '');
				break;
			}
			case 'password': {
				if (!target.value.length) break;
				!/^[A-Za-z0-9]+$/.test(target.value)
					? updateErrorsState(
							'passwordError',
							'Только латинские буквы или цифры',
					  )
					: updateErrorsState('passwordError', '');
				break;
			}
			case 'passwordRepeat': {
				updateErrorsState('passwordRepeatError', '');
				break;
			}
			default: {
			}
		}
	};

	const onFocusPassword = () => {
		updateState('passwordRepeat', '');
	};

	const onBlur = ({ target }) => {
		switch (target.name) {
			case 'email': {
				!/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(target.value)
					? updateErrorsState(
							'emailError',
							'Введён некорректный адрес электронной почты',
					  )
					: updateErrorsState('emailError', '');
				break;
			}
			case 'password': {
				if (!/[a-z]+/.test(target.value)) {
					updateErrorsState(
						'passwordError',
						'Должна быть хотя бы одна латинская буква',
					);
				} else if (!/[A-Z]+/.test(target.value)) {
					updateErrorsState(
						'passwordError',
						'Должна быть хотя бы одна большая буква',
					);
				} else if (!/\d+/.test(target.value)) {
					updateErrorsState(
						'passwordError',
						'Пароль должен содержать хотя бы одну цифру',
					);
				} else if (target.value.length < 8) {
					updateErrorsState(
						'passwordError',
						'Пароль должен быть не менее 8 символов',
					);
				} else updateErrorsState('passwordError', '');
				break;
			}
			case 'passwordRepeat': {
				target.value !== password
					? updateErrorsState('passwordRepeatError', 'Пароли должны совпадать')
					: updateErrorsState('passwordRepeatError', '');
				break;
			}
			default: {
			}
		}
	};

	return (
		<div className={styles.app}>
			<form className={styles.form} onSubmit={onSubmit}>
				<label htmlFor="email" className={styles.label}>
					{emailError}
					<input
						ref={emailRef}
						id="email"
						type="email"
						name="email"
						className={styles.input}
						placeholder="Электронная почта"
						value={email}
						onChange={onChange}
						onBlur={onBlur}
						autoFocus
						required
					/>
				</label>
				<label htmlFor="password" className={styles.label}>
					{passwordError}
					<input
						id="password"
						type="password"
						name="password"
						className={styles.input}
						placeholder="Пароль"
						value={password}
						onChange={onChange}
						onFocus={onFocusPassword}
						onBlur={onBlur}
						required
					/>
				</label>
				<label htmlFor="passwordRepeat" className={styles.label}>
					{passwordRepeatError}
					<input
						id="passwordRepeat"
						type="password"
						name="passwordRepeat"
						className={styles.input}
						placeholder="Повтор пароля"
						value={passwordRepeat}
						onChange={onChange}
						onBlur={onBlur}
						required
					/>
				</label>
				<button type="button" className={styles.button} onClick={resetState}>
					Сбросить данные
				</button>
				<button
					ref={submitButtonRef}
					type="submit"
					className={styles.button}
					disabled={!!formError}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
