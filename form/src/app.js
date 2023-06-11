import { useStore } from './hooks/useStore';
import styles from './app.module.css';

const sendData = data => {
	console.log(data);
};

export const App = () => {
	const { getState, getErrors, updateState, updateErrorsState, resetState } =
		useStore();

	const onSubmit = event => {
		event.preventDefault();
		sendData(getState());
		resetState();
	};

	const { email, password, passwordRepeat } = getState();

	const { emailError, passwordError, passwordRepeatError } = getErrors();

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
			default: {
			}
		}
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
			default: {
			}
		}
	};

	let formError = Object.values(getErrors()).some(el => el);

	return (
		<div className={styles.app}>
			<form className={styles.form} onSubmit={onSubmit}>
				<label htmlFor="email" className={styles.label}>
					{emailError}
					<input
						id="email"
						type="email"
						name="email"
						className={styles.input}
						placeholder="Электронная почта"
						value={email}
						onChange={onChange}
						onBlur={onBlur}
					/>
				</label>
				<label htmlFor="password" className={styles.label}>
					Введите пароль
					<input
						id="password"
						type="password"
						name="password"
						className={styles.input}
						placeholder="Пароль"
						value={password}
						onChange={onChange}
					/>
				</label>
				<label htmlFor="passwordRepeat" className={styles.label}>
					Повторите пароль
					<input
						id="passwordRepeat"
						type="password"
						name="passwordRepeat"
						className={styles.input}
						placeholder="Повтор пароля"
						value={passwordRepeat}
						onChange={onChange}
					/>
				</label>
				<button type="button" className={styles.button} onClick={resetState}>
					Сбросить данные
				</button>
				<button type="submit" className={styles.button} disabled={!!formError}>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
