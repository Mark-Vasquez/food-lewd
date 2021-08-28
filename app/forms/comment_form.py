from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired, Length


class CommentForm(FlaskForm):
    content = TextAreaField("Comment", validators=[DataRequired(
        message='Must write a comment.'), Length(max=300, message='300 character limit.')])
