import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import styles from "./Navbar.module.css";

const NavBar = () => {
	return (
		<nav className={styles.navbar_container}>
			<div className={styles.navbar_contents}>
				<div></div>
				<div></div>
				<div></div>
			</div>

			<NavLink to="/" exact={true} activeClassName="active">
				Home
			</NavLink>

			<NavLink to="/sign-up" exact={true} activeClassName="active">
				Sign Up
			</NavLink>

			<NavLink to="/users" exact={true} activeClassName="active">
				Users
			</NavLink>

			<LogoutButton />
		</nav>
	);
};

export default NavBar;
