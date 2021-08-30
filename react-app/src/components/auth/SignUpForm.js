import React, { useState } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import Errors from "../Errors";
import { setErrors } from "../../store/errors";

const SignUpForm = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [errors, setErrors] = useState([]);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const user = useSelector((state) => state.session.user);
	const [imageLoading, setImageLoading] = useState(false);
	const [profileImage, setProfileImage] = useState("");

	const onSignUp = async (e) => {
		e.preventDefault();
		setImageLoading(true);
		const success = await dispatch(
			signUp(username, email, profileImage, password)
		);
		if (success) {
			setImageLoading(false);
			history.push("/profile");
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
		<form onSubmit={onSignUp}>
			<div>
				<Errors />
			</div>
			<div>
				<label>User Name</label>
				<input
					type="text"
					name="username"
					onChange={updateUsername}
					value={username}></input>
			</div>
			<div>
				<label>Email</label>
				<input
					type="text"
					name="email"
					onChange={updateEmail}
					value={email}></input>
			</div>
			<div>
				<label>Profile Picture</label>
				<input
					type="file"
					accept="image/*"
					onChange={(e) => {
						const file = e.target.files[0];
						setProfileImage(file);
					}}
				/>
			</div>
			<div>
				<label>Password</label>
				<input
					type="password"
					name="password"
					onChange={updatePassword}
					value={password}></input>
			</div>
			<div>
				<label>Repeat Password</label>
				<input
					type="password"
					name="repeat_password"
					onChange={updateRepeatPassword}
					value={repeatPassword}
					required={true}></input>
			</div>
			<button type="submit">Sign Up</button>
			{imageLoading && <p>Loading...</p>}
		</form>
	);
};

export default SignUpForm;
