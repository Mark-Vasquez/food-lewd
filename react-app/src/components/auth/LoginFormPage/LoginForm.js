import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../../store/session";
import Errors from "../../Errors";
import Footer from "../../Footer";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
	const [errors, setErrors] = useState([]);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const onLogin = async (e) => {
		e.preventDefault();
		const data = await dispatch(login(email, password));
		if (data) {
			setErrors(data);
		}
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	if (user) {
		return <Redirect to="/" />;
	}

	return (
		<>
			<div className={styles.login_page_wrapper}>
				<article className={styles.login_page_container}>
					<div className={styles.splash_image}></div>
					<div className={styles.text_field_wrapper}>
						<div className={styles.field_container}>
							<h1 className={styles.foodlewd_header}>Foodlewd</h1>
							<div className={styles.form_wrapper}>
								<form onSubmit={onLogin}>
									<div>
										<Errors />
									</div>
									<div>
										<label htmlFor="email">Email</label>
										<input
											name="email"
											type="text"
											placeholder="Email"
											value={email}
											onChange={updateEmail}
										/>
									</div>
									<div>
										<label htmlFor="password">
											Password
										</label>
										<input
											name="password"
											type="password"
											placeholder="Password"
											value={password}
											onChange={updatePassword}
										/>
										<button type="submit">Login</button>
									</div>
								</form>
							</div>
						</div>
						<div className={styles.error_container}></div>
					</div>
				</article>
			</div>
			<Footer className={styles.login_footer} />
		</>
	);
};

export default LoginForm;
