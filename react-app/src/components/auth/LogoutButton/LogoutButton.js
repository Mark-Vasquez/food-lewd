import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { Link } from "react-router-dom";

const LogoutButton = () => {
	const dispatch = useDispatch();
	const onLogout = async (e) => {
		await dispatch(logout());
	};

	return (
		<>
			<Link onClick={onLogout}>
				<img src="" alt="logout button" />
			</Link>
		</>
	);
};

export default LogoutButton;
