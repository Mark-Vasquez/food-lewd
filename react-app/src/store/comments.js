import { setErrors } from "./errors";

// Define Action Types as Constants
const POST_COMMENT = "comment/postComments";
const GET_IMAGE_COMMENTS = "comment/getImageComments";
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

const editUserComment = (edited_comment) => ({
	type: EDIT_USER_COMMENT,
	edited_comment,
});

const deleteUserComment = (comment_id) => ({
	type: DELETE_USER_COMMENT,
	comment_id,
});

// Thunk to post a comment
export const postImageComment = (image_id, content) => async (dispatch) => {
	const res = await fetch(`/api/comments/image/${image_id}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		// turn body into json because it expects it
		// body of request key NEEDS to match the wtform key to populate properly
		body: JSON.stringify({ comment: content }),
	});

	// comment will either be the parsed body or the array of errors returned
	const comment = await res.json();
	// if fetch to API doesn't cause a 500
	if (res.ok) {
		dispatch(postComment(comment));
		// returns back to where postImageComment was dispatched
		// as a truthy value
		return "Success";
	} else {
		// give the action creator the comment payload
		dispatch(setErrors(comment));
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

// Thunk to edit comments
export const editComment = (comment_id, content) => async (dispatch) => {
	const res = await fetch(`/api/comments/${comment_id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		// turn body into json because it expects it
		// body of request key NEEDS to match the wtform key to populate properly
		body: JSON.stringify({ comment: content }),
	});
	// 'comment' will either be the edited comment (200) or array of errors (400)
	const comment = await res.json();
	if (res.ok) {
		dispatch(editUserComment(comment));
		return "Success";
	} else {
		dispatch(setErrors(comment));
	}
};

// Thunk to delete comment
export const destroyComment = (comment_id) => async (dispatch) => {
	const res = await fetch(`/api/comments/${comment_id}`, {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
	});
	if (res.ok) {
		dispatch(deleteUserComment(comment_id));
		// just want to return a truthy value
		return "Successfully Deleted";
	} else {
		const errorMessages = await res.json();
		dispatch(setErrors(errorMessages));
	}
};

const initialState = {};

// Create a Reducer
const commentReducer = (state = initialState, action) => {
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
		case EDIT_USER_COMMENT:
			return {
				...state,
				...action.edited_comment,
			};
		case DELETE_USER_COMMENT:
			const newState = { ...state };
			delete newState[action.comment_id];
			return newState;
		default:
			return state;
	}
};

export default commentReducer;
