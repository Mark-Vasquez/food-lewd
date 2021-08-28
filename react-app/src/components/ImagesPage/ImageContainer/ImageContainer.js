import { fetchImageComments } from "../../../store/comments";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { destroyImage } from "../../../store/image";
import { Link } from "react-router-dom";
import styles from "./ImageContainer.module.css";

const ImageContainer = ({ image }) => {
	const dispatch = useDispatch();
	const user_id = useSelector((state) => state.session.user.id);
	const comments = useSelector((state) => Object.values(state.comments));
	console.log("JIM", user_id);
	console.log(image.id);
	console.log("commments", comments);

	useEffect(() => {
		dispatch(fetchImageComments(image.id));
	}, [dispatch]);

	return (
		<>
			<h1>Image</h1>
			<div>
				<img src={image.img} alt="" />
				<p>{image.caption}</p>
				<p>----Comment below-----</p>
				<div>
					{comments.map((comment) =>
						comment.image_id === image.id ? (
							<p>{comment.content}</p>
						) : null
					)}
				</div>
				{console.log("left", user_id)}
				{console.log("right", image.user_id)}
				{user_id === image.user_id ? (
					<button
						onClick={async () => {
							await dispatch(destroyImage());
						}}>
						<img
							src="https://www.cityofkyle.com/sites/default/files/styles/full_node_primary/public/imageattachments/utilitybilling/page/1235/ub_-_trash_can_image.jpg?itok=HDnp1PbF"
							alt="trash bruh"
						/>
						tradh
					</button>
				) : null}
			</div>
		</>
	);
};

export default ImageContainer;
