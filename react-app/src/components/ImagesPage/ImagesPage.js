import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllImages, destroyImage } from "../../store/image";
import { fetchImageComments } from "../../store/comments";
import { Link } from "react-router-dom";
import ImageContainer from "./ImageContainer/ImageContainer";
import Navbar from "../Navbar";
import styles from "./ImagesPage.module.css";

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
					</div>
				</div>
			</div>
		</>
	);
};

export default ImagesPage;
