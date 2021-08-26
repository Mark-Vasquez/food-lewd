import React, { useState } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import styles from "./SubmitImagePage.module.css";

const SubmitImagePage = () => {
	const history = useHistory(); // To redirect after image upload success
	const [image, setImage] = useState(null);
	const [imageLoading, setImageLoading] = useState(false);
	const [caption, setCaption] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		// append makes key-value pairs -- "image": image
		formData.append("img", image);
		formData.append("caption", caption);

		// aws uploads can be a bit slow to display
		// so set a loading message under submit button
		setImageLoading(true);

		const res = await fetch("/api/images/user", {
			method: "POST",
			body: formData,
		});

		if (res.ok) {
			await res.json();
			setImageLoading(false);
			history.push("/images");
		} else {
			setImageLoading(false);
			// set validation error here!
			console.log("errooooorrrs");
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<h1>Submit the food</h1>
			<label className={styles.submit_image_label}>
				Submit your Image!
			</label>
			<div>
				<input
					type="file"
					accept="image/*"
					onChange={(e) => {
						const file = e.target.files[0];
						setImage(file);
					}}
				/>
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
			{imageLoading && <p>Loading...</p>}
		</form>
	);
};

export default SubmitImagePage;
