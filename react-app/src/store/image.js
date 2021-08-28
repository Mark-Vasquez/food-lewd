// Define Action Types as Constants
// const POST_IMAGE = "image/postImage";
const GET_IMAGES = "image/getImages"; // View all images
const GET_USER_IMAGES = "image/getUserImages"; // View images by user
const GET_IMAGE = "image/getImage"; // View specific image
const DELETE_IMAGE = "image/deleteImage"; // Delete specific image

// Define Action Creators
// const postImage = (image) => ({
// 	type: POST_IMAGE,
// 	image,
// });

const getAllImages = (images) => ({
	type: GET_IMAGES,
	images,
});

const getUserImages = (user_images) => ({
	type: GET_USER_IMAGES,
	user_images,
});

const getImage = (image) => ({
	type: GET_IMAGE,
	image,
});

const deleteImage = (image_id) => ({
	type: DELETE_IMAGE,
	image_id,
});

// Thunk to fetch request for recent images by all users
export const fetchAllImages = () => async (dispatch) => {
	const res = await fetch("/api/images");

	if (res.ok) {
		// destructure images so "images" key is not nested twice
		const { images } = await res.json();
		dispatch(getAllImages(images)); // payload is images from database
	}
};

// Thunk to fetch request for recent user images
export const fetchUserImages = () => async (dispatch) => {
	const res = await fetch("/api/images/user");

	if (res.ok) {
		// destructure the key you gave it in the json return
		const { user_images } = await res.json();
		dispatch(getUserImages(user_images));
	}
};

// Thunk to fetch request for a specific image with ID
export const fetchImage = (image_id) => async (dispatch) => {
	const res = await fetch(`/api/images/${image_id}`);

	if (res.ok) {
		const { image } = await res.json();
		dispatch(getImage(image));
	}
};

// Thunk to make delete request
export const destroyImage = (image_id) => async (dispatch) => {
	const res = await fetch(`/api/images/${image_id}`, {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
	});
	if (res.ok) {
		dispatch(deleteImage(image_id));
	}
};

const initialState = {};

// Create a Reducer
const imageReducer = (state = initialState, action) => {
	const newState = { ...state };
	switch (action.type) {
		case GET_IMAGES:
			return {
				...state,
				...action.images,
			};
		case GET_USER_IMAGES:
			return {
				...state,
				...action.user_images,
			};
		case GET_IMAGE:
			return {
				...state,
				...action.image,
			};
		case DELETE_IMAGE:
			delete newState[action.image_id];
			console.log("DRKZZA:", newState);
			return newState;
		default:
			return state;
	}
};

export default imageReducer;
