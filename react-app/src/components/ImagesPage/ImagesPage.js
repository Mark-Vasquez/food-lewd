import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllImages, destroyImage } from "../../store/image";
import { fetchImageComments } from "../../store/comments";
import { Link } from "react-router-dom";
import ImageContainer from "./ImageContainer/ImageContainer";

const ImagesPage = () => {
	const dispatch = useDispatch();
	// Convert the normalized state object values into an array
	const images = useSelector((state) => Object.values(state.images));

	useEffect(() => {
		dispatch(fetchAllImages());
	}, [dispatch]);
	return (
		<>
			<h1>Images Page</h1>
			{images.reverse().map((image) => (
				<div key={image.id}>
					<ImageContainer image={image} />
				</div>
			))}
		</>
	);
};

export default ImagesPage;
