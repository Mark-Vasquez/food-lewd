// Define Action Types as Constants
const POST_COMMENT = "comment/postComments";
const GET_IMAGE_COMMENTS = "comment/getImageComments";
// const GET_USER_COMMENTS = "comment/getUserComments";
const EDIT_USER_COMMENT = "comment/editUserComment";
const DELETE_USER_COMMENT = "comment/deleteUserComment";

const postComment = (comment) => ({
	type: POST_COMMENT,
	comment,
});

const getImageComments = (comments) => ({
	type: GET_IMAGE_COMMENTS,
	comments,
});

// const getUserComments = (comments) => ({
// 	type: GET_USER_COMMENTS,
// 	comments,
// });

const editUserComment = (edited_comment) => ({
	type: EDIT_USER_COMMENT,
	edited_comment,
});

const deleteUserComment = (comment_id) => ({
	type: DELETE_USER_COMMENT,
	comment_id,
});

// Thunk to post a comment
export const postImageComment = (content, image_id) => async (dispatch) => {
	const res = await fetch(`/api/comments/image/${image_id}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		// turn body into json because it expects it
		// body of request key NEEDS to match the wtform key to populate properly
		body: JSON.stringify({ content: content }),
	});

	if (res.ok) {
		const comment = await res.json();
		dispatch(postComment(comment));
		// returns back to where postImageComment was dispatch
		// as a truthy value
		return "Success";
	}
};

// Thunk to fetch comments
export const fetchImageComments = (image_id) => async (dispatch) => {
	const res = await fetch(`/api/comments/image/${image_id}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (res.ok) {
		const { comments } = await res.json();
		dispatch(getImageComments(comments));
	}
};

const initialState = {};

// Create a Reducer
const commentReducer = (state = initialState, action) => {
	const newState = { ...state };
	switch (action.type) {
		case POST_COMMENT:
			return {
				...state,
				...action.comment,
			};
		case GET_IMAGE_COMMENTS:
			return {
				...state,
				...action.comments,
			};
		default:
			return state;
	}
};

export default commentReducer;
