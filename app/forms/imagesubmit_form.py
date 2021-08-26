from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired


class ImageSubmitForm(FlaskForm):
    # variable has to match key of json object body
    caption = TextAreaField("Caption")
