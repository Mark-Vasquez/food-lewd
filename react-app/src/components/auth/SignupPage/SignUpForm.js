import React, { useState } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { signUp } from "../../../store/session";
import Errors from "../../Errors";
import { NavLink } from "react-router-dom";
import styles from "./SignupPage.module.css";
import Footer from "../../Footer";
import { useEffect } from "react";
import { setErrors } from "../../../store/errors";
import { login } from "../../../store/session";

const SignUpForm = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const user = useSelector((state) => state.session.user);
	const [imageLoading, setImageLoading] = useState(false);
	const [profileImage, setProfileImage] = useState("");
	const [photoSelected, setPhotoSelected] = useState(false);

	// Resetting errors from login page
	useEffect(() => {
		dispatch(setErrors(null));
	}, [dispatch]);

	const loginDemo = async () => {
		await dispatch(login("demo@aa.io", "password"));
	};

	const onSignUp = async (e) => {
		e.preventDefault();
		setImageLoading(true);
		const success = await dispatch(
			signUp(username, email, profileImage, password, repeatPassword)
		);
		if (success) {
			setImageLoading(false);
			// make profile after styling
			history.push("/");
		} else {
			setImageLoading(false);
		}
	};

	const updateUsername = (e) => {
		setUsername(e.target.value);
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	const updateRepeatPassword = (e) => {
		setRepeatPassword(e.target.value);
	};

	if (user) {
		return <Redirect to="/" />;
	}

	return (
		<>
			<div className={styles.signup_page_wrapper}>
				<div className={styles.signup_page_container}>
					<div className={styles.text_field_wrapper}>
						<div className={styles.field_container}>
							<h1 className={styles.foodlewd_header}>Foodlewd</h1>
							<form
								className={styles.form_form}
								onSubmit={onSignUp}>
								<h2 className={styles.friends_message}>
									Sign up to see food from all your friends.
								</h2>
								<div
									onClick={loginDemo}
									className={styles.demo_container}>
									<div className={styles.demo_icon}></div>
									<span className={styles.demo_action}>
										Log in as Demo User
									</span>
								</div>
								<div className={styles.or_block}>
									<div className={styles.left_or}></div>
									<div className={styles.or_block_text}>
										OR
									</div>
									<div className={styles.right_or}></div>
								</div>
								<div></div>
								<div>
									<input
										className={styles.text_input}
										type="text"
										name="username"
										placeholder="Username"
										onChange={updateUsername}
										value={username}></input>
								</div>
								<div>
									<input
										className={styles.text_input}
										type="text"
										name="email"
										placeholder="Email"
										onChange={updateEmail}
										value={email}></input>
								</div>
								<div>
									<input
										className={styles.text_input}
										type="password"
										name="password"
										placeholder="Password"
										onChange={updatePassword}
										value={password}></input>
								</div>
								<div>
									<input
										className={styles.text_input}
										type="password"
										name="repeat_password"
										placeholder="Repeat Password"
										onChange={updateRepeatPassword}
										value={repeatPassword}
										required={true}></input>
								</div>
								<div className={styles.upload_div}>
									<label className={styles.upload_button}>
										{photoSelected
											? "Photo Selected!"
											: "Upload a profile picture"}
										<input
											className={styles.upload_button}
											type="file"
											accept="image/*"
											onChange={(e) => {
												const file = e.target.files[0];
												setProfileImage(file);
												setPhotoSelected(true);
											}}
										/>
									</label>
								</div>
								<button
									className={styles.submit_button}
									type="submit">
									Sign Up
								</button>
								{imageLoading && (
									<p className={styles.loading_text}>
										Loading Picture...
									</p>
								)}
							</form>
						</div>
					</div>
					<div className={styles.login_container}>
						<p>Have an account?</p>
						<Link className={styles.login_text}>Log in</Link>
					</div>
					<div className={styles.hidden_error_div}>
						<Errors />
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default SignUpForm;
