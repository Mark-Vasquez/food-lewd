import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllImages, destroyImage } from "../../store/image";
import { Link } from "react-router-dom";

const ImagesPage = () => {
	const dispatch = useDispatch();
	// Convert the normalized state object values into an array
	const images = useSelector((state) => Object.values(state.images));
	const user_id = useSelector((state) => state.session.user.id);

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
						{user_id === image?.user_id ? (
							<Link
								onClick={async () => {
									await dispatch(destroyImage());
								}}>
								<img
									src="https://www.cityofkyle.com/sites/default/files/styles/full_node_primary/public/imageattachments/utilitybilling/page/1235/ub_-_trash_can_image.jpg?itok=HDnp1PbF"
									alt="trash bruh"
								/>
							</Link>
						) : null}
					</div>
				))}
			</div>
		</>
	);
};

export default ImagesPage;
