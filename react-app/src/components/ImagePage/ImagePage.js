import styles from "./ImagePage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchImage, destroyImage } from "../../store/image";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchImageComments } from "../../store/comments";

const ImagePage = () => {
	const dispatch = useDispatch();
	const { image_id } = useParams();
	const image = useSelector((state) => Object.values(state.images)[0]);
	const user_id = useSelector((state) => state.session.user.id);
	const comments = useSelector((state) => Object.values(state.comments));
	console.log("commas", comments);

	useEffect(() => {
		dispatch(fetchImage(image_id));
		dispatch(fetchImageComments(image_id));
	}, [dispatch, image_id]);
	return (
		<>
			<h1>A single specific Image</h1>
			<div>
				<img src={image?.img} alt="food" />
				<h3>{image?.user}</h3>
				<p>{image?.caption}</p>
				<p>----Comment below-----</p>
				<div>
					<p>All Comments</p>
					{comments.map((comment) =>
						comment.image_id === image?.id ? (
							<p key={comment.id}>
								<b>{comment.user}</b>
								<span> </span>
								<span>{comment.content}</span>
							</p>
						) : null
					)}
				</div>
				{user_id === image?.user_id ? (
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
				) : null}
			</div>
		</>
	);
};

export default ImagePage;
