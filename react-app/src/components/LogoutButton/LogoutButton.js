import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { Link } from "react-router-dom";
import logoutLogo from "../../assets/images/icons8-exit-64.png";
import styles from "./LogoutButton.module.css";

const LogoutButton = () => {
	const dispatch = useDispatch();
	const onLogout = async (e) => {
		await dispatch(logout());
	};

	return (
		<>
			<Link to="/" onClick={onLogout}>
				<img
					className={styles.logout_button}
					src={logoutLogo}
					alt="logout button"
				/>
			</Link>
		</>
	);
};

export default LogoutButton;
