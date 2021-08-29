import { fetchImageComments } from "../../../store/comments";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { destroyImage } from "../../../store/image";
import { postImageComment } from "../../../store/comments";
import { Link } from "react-router-dom";
import styles from "./ImageContainer.module.css";
import { useState } from "react";
import Errors from "../../Errors";

const ImageContainer = ({ image }) => {
	const dispatch = useDispatch();
	const user_id = useSelector((state) => state.session.user.id);
	const comments = useSelector((state) => Object.values(state.comments));
	const [comment, setComment] = useState("");

	const clearForm = () => {
		setComment("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const success = await dispatch(postImageComment(comment, image.id));
		// looking for a returned truthy value
		if (success) {
			clearForm();
		}
	};

	useEffect(() => {
		dispatch(fetchImageComments(image.id));
	}, [dispatch, image.id]);

	return (
		<>
			<h1>Image</h1>
			<div>
				<img src={image.img} alt="" />
				<h3>{image.user}</h3>
				<p>{image.caption}</p>
				<p>----Comment below-----</p>
				<div>
					<p>All Comments</p>
					{comments.map((comment) =>
						comment.image_id === image.id ? (
							<p key={comment.id}>
								<b>{comment.user}</b>
								<span> </span>
								<span>{comment.content}</span>
							</p>
						) : null
					)}
				</div>
				<div>
					<form onSubmit={handleSubmit}>
						<textarea
							value={comment}
							placeholder="Add a comment..."
							onChange={(e) => {
								setComment(e.target.value);
							}}></textarea>
						<button>Post</button>
					</form>
					<Errors />
				</div>
				{user_id === image.user_id ? (
					<button
						onClick={async () => {
							await dispatch(destroyImage(image.id));
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
