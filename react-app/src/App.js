import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginFormPage";
import SignUpForm from "./components/auth/SignupPage";
// import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import ImagesPage from "./components/ImagesPage";
import SubmitImagePage from "./components/SubmitImagePage";
import ProfilePage from "./components/ProfilePage";
import ImagePage from "./components/ImagePage";
import { authenticate } from "./store/session";
import { useSelector } from "react-redux";

function App() {
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user?.id);

	// Runs to check if user is logged in or not
	useEffect(() => {
		(async () => {
			await dispatch(authenticate());
			setLoaded(true);
		})();
	}, [dispatch]);

	if (!loaded) {
		return null;
	}

	return (
		<BrowserRouter>
			{/* <NavBar /> */}
			<Switch>
				<Route path="/" exact={true}>
					{user ? <ImagesPage /> : <LoginForm />}
				</Route>
				<Route path="/sign-up" exact={true}>
					<SignUpForm />
				</Route>
				<ProtectedRoute path="/users" exact={true}>
					<UsersList />
				</ProtectedRoute>
				<ProtectedRoute path="/users/:userId" exact={true}>
					<User />
				</ProtectedRoute>
				<ProtectedRoute path="/images" exact={true}>
					<ImagesPage />
				</ProtectedRoute>
				<ProtectedRoute path="/images/new" exact={true}>
					<SubmitImagePage />
				</ProtectedRoute>
				{/* <ProtectedRoute path="/profile" exact={true}>
					<ProfilePage />
				</ProtectedRoute> */}
				{/* <ProtectedRoute path="/images/:image_id" exact={true}>
					<ImagePage />
				</ProtectedRoute> */}
			</Switch>
		</BrowserRouter>
	);
}

export default App;
