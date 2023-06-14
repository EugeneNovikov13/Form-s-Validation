import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRef, useEffect } from 'react';
import styles from './app.module.css';

const sendData = data => {
	console.log(data);
};

const formSchema = yup.object().shape({
	email: yup
		.string()
		.required('Обязательное поле для заполнения')
		.matches(/^[\w\-@.]*$/, 'Допустимы только латинские буквы, цифры и _ . - @')
		.matches(
			/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/,
			'Введён некорректный адрес электронной почты',
		),
	password: yup
		.string()
		.required('Обязательное поле для заполнения')
		.matches(/[A-Za-z0-9]/, 'Только латинские буквы или цифры')
		.matches(/[a-z]/, 'Должна быть хотя бы одна латинская буква')
		.matches(/[A-Z]/, 'Должна быть хотя бы одна большая буква')
		.matches(/\d/, 'Пароль должен содержать хотя бы одну цифру')
		.min(8, 'Пароль должен быть не менее 8 символов'),
	passwordRepeat: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
});

export const App = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			passwordRepeat: '',
		},
		resolver: yupResolver(formSchema),
	});

	const emailError = errors.email?.message;
	const passwordError = errors.password?.message;
	const passwordRepeatError = errors.passwordRepeat?.message;

	const formError = Object.values(errors).some(el => el);

	const submitButtonRef = useRef(null);

	// useEffect(() => {
	// 	if (
	// 		/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email) &&
	// 		/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/g.test(password) &&
	// 		password === passwordRepeat &&
	// 		!formError
	// 	)
	// 		submitButtonRef.current.focus();
	// }, [email, password, passwordRepeat, formError]);

	// const onSubmit = event => {
	// 	event.preventDefault();
	// 	sendData(getState());
	// 	resetState();
	// 	emailRef.current.focus();
	// };

	return (
		<div className={styles.app}>
			<form className={styles.form} onSubmit={handleSubmit(sendData)}>
				<label htmlFor="email" className={styles.label}>
					{emailError}
					<input
						ref={register}
						id="email"
						type="email"
						name="email"
						className={styles.input}
						placeholder="Электронная почта"
						{...register('email')}
						autoFocus
					/>
				</label>
				<label htmlFor="password" className={styles.label}>
					{passwordError}
					<input
						ref={register}
						id="password"
						type="password"
						name="password"
						className={styles.input}
						placeholder="Пароль"
						{...register('password')}
					/>
				</label>
				<label htmlFor="passwordRepeat" className={styles.label}>
					{passwordRepeatError}
					<input
						ref={register}
						id="passwordRepeat"
						type="password"
						name="passwordRepeat"
						className={styles.input}
						placeholder="Повтор пароля"
						{...register('passwordRepeat')}
					/>
				</label>
				<button type="button" className={styles.button}>
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
