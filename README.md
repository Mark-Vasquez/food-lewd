# Foodlewd

## About Foodlewd

[Foodlewd](https://food-lewd.herokuapp.com/) is a fullstack app created to connect foodlovers through photography and interactivity. Users can upload their photos to be commented on by others. The pictures can be deleted as well as the comments in case a user changes their mind. Comments also be easily edited. This allows users from all over the world to easily share and flex what's for dinner, whether it's a luxurious meal or something cheap and decadent.

## Application Architecture

Foodlewd's frontend is built on a React with Redux to manage the application's state. Python backend is used to serve the frontend using Flask. PostgreSQL is used as the application's database.

## Frontend Overview

Foodlewd uses React for the backend to provide a smooth and snappy experience for user interaction.

### Frontend Technologies Used

#### React

React is a front-end Javascript library used to handle webpage renderings and UI. Everything displayed to the user is served with React.

#### Redux

Redux is used by the Foodlewd app to make API calls the the backend and handle state in the Redux store.

## Backend Overview

Foodlewd uses Python with a Flask framework to query the PostgreSQL database.

### Backend Technologies Used

#### Flask

Flask is an extensible framework used as Foodlewd's backend. Flask uses routes to respond to API calls made by the frontend.

#### WTForms

WTForms is an extension of Flask that provides form validation, constraints, and error handling. The frontend sends a form submission with JSON and the keys of that object populates the WTForm keys to ensure proper form input from the user.

#### SQLAlchemy

SQLAlchemy is an Object Relational Mapper used with Flask to write queries to to and from the database. Mapping classes are used to create relationships and columns between multiple tables in the database.

#### Alembic

Alembic is used to migrate the created class tables to the database and keep track of all the migration versions.

#### AWS S3

Amazon Web Services S3 allows users to view the stored images as well as upload their own images.

## Conclusions and Next Steps

Users are able upload images and comment on it, but what if users are also able to show love and appreciate to the content with 'likes'? Users will be able to gauge popularity on a food post by viewing the amount of likes it has. Image owners should also be able to see exactly who liked their photo and follow them back.

The implementation of "following" other users will tie the whole project together to make it a real social network. Users should be able to see who followed them and follow another user back so they can see more images that they resonate with.
