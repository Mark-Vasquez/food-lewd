import styles from "./ImagePage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchImage } from "../../store/image";
import { useEffect } from "react";

const ImagePage = () => {
	const dispatch = useDispatch();
	const { image_id } = useParams();
	const image = useSelector((state) => Object.values(state.images)[0]);
	console.log("thicky", image);
	const user_id = useSelector((state) => state.session.user.id);

	useEffect(() => {
		dispatch(fetchImage(image_id));
	}, [dispatch, image_id]);
	return (
		<>
			<h1>A single specific Image</h1>
			<div>
				<img src={image?.img} alt="food" />
				<p>{image?.caption}</p>
			</div>
		</>
	);
};

export default ImagePage;
