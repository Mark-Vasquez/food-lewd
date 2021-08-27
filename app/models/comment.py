from .db import db


class Comment(db.Model):
    __tablename__ = "comments"
