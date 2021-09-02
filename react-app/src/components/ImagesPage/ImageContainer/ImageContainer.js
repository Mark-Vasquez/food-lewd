import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { destroyImage } from "../../../store/image";
import { postImageComment } from "../../../store/comments";
import { Link } from "react-router-dom";
import styles from "./ImageContainer.module.css";
import { useState } from "react";

import trashButton from "../../../assets/images/icons8-trash-60.png";
import editCommentButton from "../../../assets/images/icons8-edit-48.png";
import {
	fetchImageComments,
	destroyComment,
	editComment,
} from "../../../store/comments";

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
				<div className={styles.photo_container}>
					<div className={styles.pic_wrapper}>
						<img
							className={styles.pic}
							src={image.img}
							alt="posted"
						/>
					</div>
				</div>
				<div className={styles.bottom_third}>
					<div className={styles.poster_caption_container}>
						<span className={styles.image_owner}>{image.user}</span>{" "}
						<span>&nbsp;</span> <span>{image.caption}</span>
					</div>
					<div className={styles.view_all_div}>
						<Link
							className={styles.view_all_link}
							to={`/images/${image.id}`}>
							View all comments...
						</Link>
					</div>
					<div className={styles.comment_block}>
						{comments.map((comment) =>
							comment.image_id === image.id ? (
								<>
									<div className={styles.commenters}>
										<div className={styles.comments}>
											<span
												className={styles.comment_owner}
												key={comment.id}>
												{comment.user}&nbsp;
												<span
													className={
														styles.comment_content
													}>
													{comment.content}
												</span>
											</span>
										</div>
										<span
											className={styles.edit_trash_block}>
											<span>
												{" "}
												<img
													className={
														styles.edit_button
													}
													src={editCommentButton}
													alt="Edit"
												/>
											</span>
											<span>
												{" "}
												<img
													onClick={async (e) =>
														await dispatch(
															destroyComment(
																comment?.id
															)
														)
													}
													className={
														styles.delete_button
													}
													src={trashButton}
													alt=""
												/>{" "}
											</span>
										</span>
									</div>
								</>
							) : null
						)}
					</div>
					<div className={styles.post_container}>
						<form
							className={styles.form_form}
							onSubmit={handleSubmit}>
							<textarea
								value={comment}
								spellCheck="false"
								className={styles.text_input}
								placeholder="Add a comment..."
								onChange={(e) => {
									setComment(e.target.value);
								}}></textarea>
							<button className={styles.post_button}>Post</button>
						</form>
					</div>
				</div>
				<div className={styles.errors}></div>
			</div>
		</>
	);
};

export default ImageContainer;
