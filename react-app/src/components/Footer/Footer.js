import styles from "./Footer.module.css";
import linkedinLogo from "../../assets/images/icons8-linkedin-64.png";
import githubLogo from "../../assets/images/icons8-github-60.png";

const Footer = () => {
	return (
		<footer className={styles.footer_wrapper}>
			<div className={styles.footer_container}>
				<div className={styles.about_links_container}>
					<div className={styles.about_links_inner_top}>
						<div className={styles.linkedin_container}>
							<a
								className={styles.linked_in_text}
								href="https://www.linkedin.com/in/mark-vasquez-439858212/">
								Linkedin
								<img
									className={styles.linked_in_logo}
									src={linkedinLogo}
									alt="LinkedIn"
								/>
							</a>
						</div>
						<div className={styles.github_container}>
							{" "}
							<a
								className={styles.github_text}
								href="https://github.com/Mark-Vasquez/food-lewd">
								GitHub
								<img
									className={styles.github_logo}
									src={githubLogo}
									alt="GitHub"
								/>
							</a>
						</div>
					</div>
				</div>
				<div className={styles.name_container}>
					<span className={styles.name_text}>
						Foodlewd developed by Mark Vasquez
					</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
