import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../../components/auth/LogoutButton";
import styles from "./Navbar.module.css";
import { useSelector } from "react-redux";
import homeLogo from "../../assets/images/icons8-home-48.png";
import uploadLogo from "../../assets/images/icons8-upload-48.png";

const NavBar = () => {
	const userPic = useSelector((state) => state?.session?.user?.profile_img);
	const userName = useSelector((state) => state?.session?.user?.username);

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
					<div>
						<Link to="/" exact={true}>
							<img
								className={styles.homelogo}
								src={homeLogo}
								alt="home button"
							/>
						</Link>
					</div>
					{/* <div>
						<p className={styles.welcome_message}>
							Welcome, {userName}!
						</p>
					</div> */}
					{/* <div>
						<Link to="/profile">
							<img
								className={styles.profile_pic}
								src={userPic}
								alt="profile pic"
							/>
						</Link>
					</div> */}
					<div>
						<Link to="/images/new">
							<img
								className={styles.upload_logo}
								src={uploadLogo}
								alt="upload"
							/>
						</Link>
					</div>
					<div>
						<LogoutButton />
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
