import styles from "./ImagePage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchImage, destroyImage } from "../../store/image";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
	destroyComment,
	editComment,
	fetchImageComments,
} from "../../store/comments";
import { postImageComment } from "../../store/comments";
import Errors from "../Errors";

const ImagePage = () => {
	const dispatch = useDispatch();
	const { image_id } = useParams();
	// Not mapping, so just grab the one and only index
	const image = useSelector((state) => Object.values(state.images)[0]);
	const user_id = useSelector((state) => state.session.user.id);
	const comments = useSelector((state) => Object.values(state.comments));
	const [comment, setComment] = useState("");
	const [commentEdit, setCommentEdit] = useState("");
	const [clickedValue, setClickedValue] = useState(null);
	const [clickedEdit, setClickedEdit] = useState(false);

	const clearForm = () => {
		setComment("");
	};

	const handleCommentSubmit = async (e) => {
		e.preventDefault();

		const success = await dispatch(postImageComment(image.id, comment));
		// looking for a returned truthy value
		if (success) {
			clearForm();
		}
	};

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
								<span> </span>
								{user_id === comment.user_id ? (
									<>
										<button
											value={comment.id}
											// If edit button value equals commentID and clickedValue is truthy,
											// meaning a textarea is showing, setClicked value to null
											// which will unrender the textarea
											onClick={(e) => {
												+e.target.value ===
													+comment.id && clickedValue
													? setClickedValue(null)
													: setClickedValue(
															e.target.value
													  );
											}}>
											Edit
										</button>
										<button
											onClick={async (e) =>
												await dispatch(
													destroyComment(comment?.id)
												)
											}>
											Delete Comment
										</button>
										{+clickedValue === +comment.id ? (
											<form
												onSubmit={async (e) => {
													e.preventDefault();

													const success =
														await dispatch(
															editComment(
																comment.id,
																commentEdit
															)
														);

													if (success) {
														setClickedValue(null);
													}
												}}>
												<textarea
													value={commentEdit}
													placeholder="Edit a comment..."
													onChange={(e) => {
														setCommentEdit(
															e.target.value
														);
													}}></textarea>
												<button>Submit</button>
											</form>
										) : null}
									</>
								) : null}
							</p>
						) : null
					)}
				</div>
				<div>
					<form onSubmit={handleCommentSubmit}>
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
				{user_id === image?.user_id ? (
					<button
						onClick={async (e) => {
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
