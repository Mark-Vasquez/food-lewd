from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import InputRequired, Length


class CommentForm(FlaskForm):
    content = TextAreaField("Comment", validators=[InputRequired(
        message='Must write a comment.'), Length(min=1, max=300, message='Must be between 1 and 300 characters.')])
