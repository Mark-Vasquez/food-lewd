import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { fetchUserImages, destroyImage } from "../../store/image";

const ProfilePage = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const images = useSelector((state) => Object.values(state.images));
	console.log("Images by user:1 ", images);

	useEffect(() => {
		dispatch(fetchUserImages());
	}, [dispatch]);
	return (
		<>
			<h1>Profile</h1>
			<div>
				{images.reverse().map((image) => (
					<div key={image.id}>
						<img src={image.img} alt="test" />
						<p>{image.caption}</p>
						<Link
							onClick={async () => {
								await dispatch(destroyImage(image?.id));
								// history.push("/profile");
							}}>
							Delete
							<img
								src="https://www.cityofkyle.com/sites/default/files/styles/full_node_primary/public/imageattachments/utilitybilling/page/1235/ub_-_trash_can_image.jpg?itok=HDnp1PbF"
								alt="trash bruh"
							/>
						</Link>
					</div>
				))}
			</div>
		</>
	);
};

export default ProfilePage;
