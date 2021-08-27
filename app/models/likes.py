from .db import db

# Joins table between Users and Images
likes = db.Table(
    "likes",
    db.Model.metadata,
    # Does not need its own pk id column because
    # we are using both pk of each columns to get unique
    # instance of likes table
    db.Column("user_id", db.Integer, db.ForeignKey(
        "users.id"), primary_key=True),
    db.Column("image_id", db.Integer, db.ForeignKey(
        "images.id"), primary_key=True)
)
