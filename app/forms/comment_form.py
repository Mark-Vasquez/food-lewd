from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import InputRequired, Length


class CommentForm(FlaskForm):
    content = TextAreaField("Comment", validators=[InputRequired(
        message='Must write a comment.'), Length(max=300, message='Must be under 300 characters')])
