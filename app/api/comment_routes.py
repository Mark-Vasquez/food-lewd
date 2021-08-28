from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Comment, db


comment_routes = Blueprint("comments", __name__)


# View all comments for a photo
@comment_routes.route("/image/<int:image_id>", methods=["GET"])
@login_required
def photo_comments(image_id):
    comments = Comment.query.filter(
        Comment.image_id == image_id).order_by(Comment.created_at).all()
    return {"comments": {comment.id: comment.to_dict() for comment in comments}}
