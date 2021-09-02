import React, { useState } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import styles from "./SubmitImagePage.module.css";
import { sendImage } from "../../store/image";
import Errors from "../Errors";
import NavBar from "../Navbar";
import Footer from "../Footer";

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
	};

	return (
		<>
			<NavBar />
			<div className={styles.upload_page_wrapper}>
				<div className={styles.submit_page_container}>
					<div className={styles.splash_image}></div>
					<div className={styles.text_field_wrapper}>
						<div className={styles.field_container}>
							<h1 className={styles.submit_header}>
								Submit the Food
							</h1>
							<form
								className={styles.form_form}
								onSubmit={handleSubmit}>
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

								<div>
									<textarea
										spellCheck="false"
										className={styles.caption_textarea}
										value={caption}
										placeholder="Caption this photo"
										onChange={(e) => {
											setCaption(e.target.value);
										}}
									/>
								</div>
								<button
									className={styles.submit_button}
									type="submit">
									Submit
								</button>
								<Errors />
								{imageLoading && <p>Loading...</p>}
							</form>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default SubmitImagePage;
