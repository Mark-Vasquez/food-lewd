from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import InputRequired, Length


class CommentForm(FlaskForm):
    comment = TextAreaField("Comment", validators=[InputRequired(
        message='Please write some input'), Length(max=300, message='Must be under 300 characters')])
