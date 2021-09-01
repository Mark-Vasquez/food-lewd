import React, { useState } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import styles from "./SubmitImagePage.module.css";
import { sendImage } from "../../store/image";
import Errors from "../Errors";

const SubmitImagePage = () => {
	const dispatch = useDispatch();
	const history = useHistory(); // To redirect after image upload success
	const [image, setImage] = useState("");
	const [imageLoading, setImageLoading] = useState(false);
	const [caption, setCaption] = useState("");
	const [photoSelected, setPhotoSelected] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setImageLoading(true);
		const success = await dispatch(sendImage(image, caption));
		// looking for a truthy value
		if (success) {
			setImageLoading(false);
			history.push("/images");
		} else {
			setImageLoading(false);
		}
		// if (res.ok) {
		// 	setImageLoading(false);
		// 	history.push("/images");
		// } else {
		// 	setImageLoading(false);

		// 	//errors here
		// }
	};

	return (
		<form onSubmit={handleSubmit}>
			<h1>Submit the food</h1>
			<div className={styles.upload_div}>
				<label className={styles.upload_button}>
					{photoSelected
						? "Photo Selected!"
						: "Upload a profile picture"}
					<input
						className={styles.upload_button}
						type="file"
						accept="image/*"
						onChange={(e) => {
							const file = e.target.files[0];
							setImage(file);
							setPhotoSelected(true);
						}}
					/>
				</label>
			</div>
			<label className={styles.caption_label}>Caption This!</label>
			<div>
				<textarea
					className={styles.caption_textare}
					value={caption}
					placeholder="Caption this photo"
					onChange={(e) => {
						setCaption(e.target.value);
					}}
				/>
			</div>
			<button type="submit">Submit</button>
			<Errors />
			{imageLoading && <p>Loading...</p>}
		</form>
	);
};

export default SubmitImagePage;
