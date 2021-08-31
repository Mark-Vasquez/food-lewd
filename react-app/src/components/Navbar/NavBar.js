import React from "react";
import { Link, NavLink } from "react-router-dom";
import LogoutButton from "../LogoutButton";
import styles from "./Navbar.module.css";
import { useSelector } from "react-redux";

const NavBar = () => {
	const user_pic = useSelector((state) => state?.session.user.profile_img);
	console.log("pikachu", user_pic);

	return (
		<nav className={styles.navbar_container}>
			<div className={styles.navbar_contents}>
				<div className={styles.logo_container}>
					<div className={styles.foodlewd_container}>
						<Link to="/" className={styles.foodlewd_logo}>
							{"Foodlewd"}
						</Link>
					</div>
				</div>
				<div className={styles.future_searchbar}></div>
				<div className={styles.right_icons_wrapper}>
					<div className={styles.right_icons_container}>
						<Link to="/" exact={true} activeClassName="active">
							Home
						</Link>
					</div>
					<div>
						<LogoutButton />
					</div>
					<div>
						<Link to="/profile">
							<img
								className={styles.profile_wrap}
								src={user_pic}
								alt="profile pic"
							/>
						</Link>
					</div>
				</div>
			</div>

			{/* 
			<NavLink to="/sign-up" exact={true} activeClassName="active">
				Sign Up
			</NavLink>
			<NavLink to="/users" exact={true} activeClassName="active">
				Users
			</NavLink>
			<LogoutButton /> */}
		</nav>
	);
};

export default NavBar;
