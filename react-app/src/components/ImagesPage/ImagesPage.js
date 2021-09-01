import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllImages, destroyImage } from "../../store/image";
import { fetchImageComments } from "../../store/comments";
import { Link } from "react-router-dom";
import ImageContainer from "./ImageContainer/ImageContainer";
import Navbar from "../Navbar";
import styles from "./ImagesPage.module.css";
import linkedinLogo from "../../assets/images/icons8-linkedin-64.png";
import githubLogo from "../../assets/images/icons8-github-60.png";

const ImagesPage = () => {
	const dispatch = useDispatch();
	// Convert the normalized state object values into an array
	const images = useSelector((state) => Object.values(state.images));
	const userPic = useSelector((state) => state?.session?.user?.profile_img);
	const userName = useSelector((state) => state?.session?.user?.username);

	useEffect(() => {
		dispatch(fetchAllImages());
	}, [dispatch]);
	return (
		<>
			<Navbar />
			<div className={styles.image_page_container}>
				<div className={styles.middle_scroll_wrapper}>
					<div className={styles.left_images_container}>
						<div>
							<h1>Images Page</h1>
							{images.reverse().map((image) => (
								<div key={image.id}>
									<ImageContainer image={image} />
								</div>
							))}
						</div>
					</div>
					<div className={styles.right_info_container}>
						<div className={styles.profile_name_container}>
							<div className={styles.profile_logo_container}>
								<Link to="/profile">
									<img
										className={styles.profile_pic}
										src={userPic}
										alt="profile pic"
									/>
								</Link>
							</div>
							<div className={styles.user_name}>
								<Link
									className={styles.user_name_link}
									to="/profile">
									{userName}
								</Link>
							</div>
						</div>
						{/* Complete users feature after grading */}
						{/* <div className={styles.user_suggestion_container}>
							<div className={styles.suggestion_text_container}>
								<div className={styles.suggestion_text}>
									Other Food Lovers
								</div>
							</div>
							<div className={styles.users_container}>
								<div className={styles.indiv_user_container}>
									<div
										className={
											styles.user_icon_suggest
										}></div>
									<div
										className={
											styles.user_name_suggest
										}></div>
								</div>
							</div>
						</div> */}
						<div className={styles.mini_footer_container}>
							<div className={styles.about_links_container}>
								<div className={styles.about_links_inner_top}>
									<div className={styles.github_container}>
										{" "}
										<a
											className={styles.github_text}
											href="https://github.com/Mark-Vasquez">
											GitHub
											<img
												className={styles.github_logo}
												src={githubLogo}
												alt="GitHub"
											/>
										</a>
									</div>
									<div className={styles.linkedin_container}>
										<a
											className={styles.linked_in_text}
											href="https://www.linkedin.com/in/mark-vasquez-439858212/">
											Linkedin
											<img
												className={
													styles.linked_in_logo
												}
												src={linkedinLogo}
												alt="LinkedIn"
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
					</div>
				</div>
			</div>
		</>
	);
};

export default ImagesPage;
