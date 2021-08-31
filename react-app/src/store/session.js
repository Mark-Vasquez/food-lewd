import { setErrors } from "./errors";

// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const initialState = { user: null };

// Authenticate a user thunk
export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

// Login thunk
export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});
	// data from res is either data you want(200) or errors(401)
	const data = await response.json();
	if (response.ok) {
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		dispatch(setErrors(data));
	} else {
		return ["An error occurred. Please try again."];
	}
};

// Logout thunk
export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	console.log("JAKE", response);

	if (response.ok) {
		dispatch(removeUser());
	}
};

// Signup thunk
export const signUp =
	(username, email, profile_img, password, repeatPassword) =>
	async (dispatch) => {
		const formData = new FormData();
		formData.append("username", username);
		formData.append("email", email);
		formData.append("img", profile_img);
		formData.append("password", password);
		formData.append("confirm", repeatPassword);

		const response = await fetch("/api/auth/signup", {
			method: "POST",
			body: formData,
		});

		const data = await response.json();
		if (response.ok) {
			dispatch(setUser(data));
			return "Success";
		} else if (response.status < 500) {
			dispatch(setErrors(data));
		} else {
			return ["An error occurred. Please try again."];
		}
	};

const sessionReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		default:
			return state;
	}
};

export default sessionReducer;
