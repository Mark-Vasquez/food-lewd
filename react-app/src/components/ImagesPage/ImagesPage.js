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
					<div className={styles.right_info_container}></div>
				</div>
			</div>
		</>
	);
};

export default ImagesPage;
