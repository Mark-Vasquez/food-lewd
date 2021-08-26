import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllImages } from "../../store/image";

const ImagesPage = () => {
	const dispatch = useDispatch();
	// Convert the normalized state object values into an array
	const images = useSelector((state) => Object.values(state.images));
	console.log("nicky yam", images);

	useEffect(() => {
		dispatch(fetchAllImages());
	}, [dispatch]);
	return (
		<>
			<h1>Images Page</h1>
			<div>
				{images.reverse().map((image) => (
					<div key={image.id}>
						<img src={image.img} alt="test" />
						<p>{image.caption}</p>
					</div>
				))}
			</div>
		</>
	);
};

export default ImagesPage;
