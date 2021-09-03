import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { fetchUserImages, destroyImage } from "../../store/image";
import NavBar from "../Navbar";
import styles from "./ProfilePage.module.css";

const ProfilePage = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const images = useSelector((state) => Object.values(state.images));
	const user = useSelector((state) => state?.session?.user);

	useEffect(() => {
		dispatch(fetchUserImages());
	}, [dispatch]);
	return (
		<>
			<NavBar />

			<div className={styles.profile_page_container}>
				<div className={styles.middle_scroll_wrapper}>
					<header className={styles.header_wrapper}>
						<div className={styles.left_header_wrap}>
							<img
								className={styles.profile_pic}
								src={user.profile_img}
								alt=""
							/>
						</div>
						<div className={styles.right_header_wrap}>
							<div className={styles.username_top_row}>
								<p>{user.username}</p>
							</div>
						</div>
					</header>
					<div className={styles.posts_tags_container}></div>
					<div className={styles.pictures_wrapper}>
						{images.reverse().map((image) => (
							<Link to={`/images/${image.id}`}>
								<div className={styles.image_container}>
									<img
										className={styles.actual_image}
										src={image.img}
										alt=""
									/>
								</div>
							</Link>
						))}
						{/* <div className={styles.picture_row_wrapper}>
							<div className={styles.first_column}></div>
							<div className={styles.second_column}></div>
							<div className={styles.third_column}></div>
						</div> */}
					</div>
				</div>
			</div>

			{/* <div>
				{images.reverse().map((image) => (
					<div key={image.id}>
						<img src={image.img} alt="test" />
						<p>{image.caption}</p>
						<button
							onClick={async () => {
								await dispatch(destroyImage(image?.id));
								// history.push("/profile");
							}}>
							Delete
							<img
								src="https://www.cityofkyle.com/sites/default/files/styles/full_node_primary/public/imageattachments/utilitybilling/page/1235/ub_-_trash_can_image.jpg?itok=HDnp1PbF"
								alt="trash bruh"
							/>
						</button>
					</div>
				))}
			</div> */}
		</>
	);
};

export default ProfilePage;
