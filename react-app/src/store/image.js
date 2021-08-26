// Define Action Types as Constants
const POST_IMAGE = "image/postImage";
const GET_IMAGES = "image/getImages"; // View all images
const GET_USER_IMAGES = "image/getUserImages"; // View images by user
const GET_IMAGE = "image/getImage"; // View specific image
const DELETE_IMAGE = "image/deleteImage"; // Delete specific image

// Define Action Creators
const postImage = (image) => ({
	type: POST_IMAGE,
	image,
});

const getAllImages = (images) => ({
	type: GET_IMAGES,
	images,
});

const getUserImages = (images) => ({
	type: GET_USER_IMAGES,
	images,
});

const getImage = (image) => ({
	type: GET_IMAGE,
	image,
});

const deleteImage = (image_id) => ({
	type: DELETE_IMAGE,
	image_id,
});

// Thunk making post request to add images
export const addPhoto = (file) => async (dispatch) => {
	const res = await fetch("/api/images/user/");
};

// Thunk to fetch request for recent images by all users
export const fetchAllImages = () => async (dispatch) => {
	const res = await fetch("/api/images");
	const { images } = await res.json();
	dispatch(getAllImages(images)); // payload is images from database
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
		default:
			return state;
	}
};

export default imageReducer;
