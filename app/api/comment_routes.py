from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Comment, db  # Import Comment model
from app.forms import CommentForm  # Import Comment form class


comment_routes = Blueprint("comments", __name__)


# View all comments for a photo
@comment_routes.route("/image/<int:image_id>", methods=["GET"])
@login_required
def photo_comments(image_id):
    comments = Comment.query.filter(
        Comment.image_id == image_id).order_by(Comment.created_at).all()
    return {"comments": {comment.id: comment.to_dict() for comment in comments}}


# Post a comment as a user on a photo
@comment_routes.route("/image/<int:image_id>", methods=["POST"])
@login_required
def post_comment(image_id):
    form = CommentForm()
    # Manually inject csrf token into form instance
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            content=form.data["comment"],
            user_id=current_user.id,
            image_id=image_id,
        )
        db.session.add(comment)
        db.session.commit()
        return {comment.id: comment.to_dict()}
    else:
        # Anything returned from backend can be part of
        # the redux state when returned, including errors
        errors = form.errors
        # when not returning dictionary, need to tell flask to
        # turn this list into JSON with jsonify
        return jsonify([f'{field_key.capitalize()}: {error}'
                        for field_key in errors
                        for error in errors[field_key]]), 400
