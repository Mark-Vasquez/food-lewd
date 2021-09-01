import { fetchImageComments } from "../../../store/comments";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { destroyImage } from "../../../store/image";
import { postImageComment } from "../../../store/comments";
import { Link } from "react-router-dom";
import styles from "./ImageContainer.module.css";
import { useState } from "react";
import Errors from "../../Errors";
import trashButton from "../../../assets/images/icons8-trash-60.png";

const ImageContainer = ({ image }) => {
	const dispatch = useDispatch();
	const user_id = useSelector((state) => state.session.user.id);
	const comments = useSelector((state) => Object.values(state.comments));
	// const userImage = useSelector((state) => state.)
	const [comment, setComment] = useState("");

	const clearForm = () => {
		setComment("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const success = await dispatch(postImageComment(image.id, comment));
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
			<div className={styles.image_container}>
				<div className={styles.header_container}>
					<div className={styles.image_post_icon_container}>
						<img
							className={styles.image_post_icon}
							src={image.user_image}
							alt="Poster"
						/>
					</div>
					<div className={styles.image_post_username}>
						{image.user}
					</div>
					<div
						onClick={async () => {
							await dispatch(destroyImage(image.id));
						}}
						className={styles.trash_button}>
						{user_id === image.user_id ? (
							<img
								className={styles.trash_img}
								src={trashButton}
								alt="trash bruh"
							/>
						) : null}
					</div>
				</div>
				<div className={styles.pic_wrapper}>
					<img className={styles.pic} src={image.img} alt="posted" />
				</div>
				<div className={styles.comments_container}>
					<div className={styles.poster_caption_container}>
						<span className={styles.image_owner}>{image.user}</span>{" "}
						<span>&nbsp;</span> <span>{image.caption}</span>
					</div>
				</div>
			</div>
			<div>
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
			</div>
		</>
	);
};

export default ImageContainer;
