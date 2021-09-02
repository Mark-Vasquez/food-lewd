from .db import db


class Image(db.Model):
    __tablename__ = "images"

    id = db.Column(db.Integer, primary_key=True)
    img = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    caption = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(
        db.DateTime, default=db.func.now(), onupdate=db.func.now())

    # These relationships are just a list of instances
    # of the other class
    user_likes = db.relationship(
        "User", secondary="likes", back_populates="liked_images", cascade="all, delete")
    user = db.relationship("User", back_populates="images")
    comments = db.relationship(
        "Comment", back_populates="image", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "img": self.img,
            "user_id": self.user_id,
            "caption": self.caption,
            # "user": [user.to_dict() for user in self.user]
            "user": self.user.username,
            "user_image": self.user.profile_img
        }
