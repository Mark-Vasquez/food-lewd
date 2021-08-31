import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../../store/session";
import Errors from "../../Errors";
import Footer from "../../Footer";
import styles from "./LoginForm.module.css";
import { setErrors } from "../../../store/errors";
import { Link } from "react-router-dom";

const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const loginDemo = async () => {
		await dispatch(login("demo@aa.io", "password"));
	};

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
							<form
								className={styles.form_form}
								onSubmit={onLogin}>
								<div>
									<input
										className={styles.email_input}
										name="email"
										type="text"
										placeholder="Email"
										value={email}
										required={true}
										onChange={updateEmail}
									/>
								</div>
								<div>
									<input
										className={styles.password_input}
										name="password"
										type="password"
										placeholder="Password"
										value={password}
										required={true}
										onChange={updatePassword}
									/>
								</div>
								<div>
									<button
										className={styles.login_button}
										type="submit">
										Log In
									</button>
								</div>
								<div className={styles.or_block}>
									<div className={styles.left_or}></div>
									<div className={styles.or_block_text}>
										OR
									</div>
									<div className={styles.right_or}></div>
								</div>
								<div
									onClick={loginDemo}
									className={styles.demo_container}>
									<div className={styles.demo_icon}></div>
									<span className={styles.demo_action}>
										Log in as Demo User
									</span>
								</div>
							</form>
						</div>
						<div className={styles.sign_up_container}>
							<p>Don't have an account?</p>
							<Link className={styles.sign_up_text} to="/sign-up">
								Sign up
							</Link>
						</div>
						<div className={styles.hidden_error_div}>
							<Errors />
						</div>
					</div>
					<div className={styles.error_container}></div>
				</article>
			</div>
			<Footer />
		</>
	);
};

export default LoginForm;
