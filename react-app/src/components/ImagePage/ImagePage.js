import styles from "./ImagePage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchImage, destroyImage } from "../../store/image";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchImageComments } from "../../store/comments";
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
											onClick={(e) =>
												setClickedValue(e.target.value)
											}>
											Edit
										</button>
										{console.log(
											"clickedval",
											clickedValue
										)}
										{console.log("commentID", comment.id)}
										{console.log(
											+clickedValue === comment.id
										)}
										{+clickedValue === comment.id ? (
											<form>
												<textarea
													value={commentEdit}
													placeholder="Edit a comment..."
													onChange={(e) => {
														setCommentEdit(
															e.target.value
														);
													}}></textarea>
											</form>
										) : null}
									</>
								) : null}
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
