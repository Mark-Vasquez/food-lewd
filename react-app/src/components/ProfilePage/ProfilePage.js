import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserImages } from "../../store/image";

const ProfilePage = () => {
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
					</div>
				))}
			</div>
		</>
	);
};

export default ProfilePage;
