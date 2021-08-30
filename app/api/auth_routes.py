from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename
)

auth_routes = Blueprint('auth', __name__)


# Is requested when any page loads
@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    else:
        # Anything returned from backend can be part of
        # the redux state when returned, including errors
        errors = form.errors
        # when not returning dictionary, need to tell flask to
        # turn this list into JSON with jsonify
        return jsonify([f'{field_key.capitalize()}: {error}'
                        for field_key in errors
                        for error in errors[field_key]]), 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Processes the image file sent in the request
    """
    # getting image from the request
    if "img" not in request.files:
        return jsonify(["Image required!"]), 400

    image = request.files["img"]

    if not allowed_file(image.filename):
        return jsonify(["File type not permitted"]), 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        return upload, 400

    url = upload["url"]

    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            profile_img=url,
            password=form.data['password']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    else:
        errors = form.errors
        return jsonify([f'{field_key.capitalize()}: {error}'
                        for field_key in errors
                        for error in errors[field_key]]), 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
