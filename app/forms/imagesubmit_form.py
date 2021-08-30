from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileRequired, FileAllowed
from wtforms import TextAreaField
from wtforms.validators import Length


class ImageSubmitForm(FlaskForm):
    # variable has to match key of json object body
    img = FileField("img")
    caption = TextAreaField("Caption", validators=[
                            Length(max=200, message='200 character limit.')])
