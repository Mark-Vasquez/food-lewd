from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Image, db
from app.forms import ImageSubmitForm
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename
)


image_routes = Blueprint("images", __name__)


# View all recent images by all users
@image_routes.route("", methods=["GET"])
@login_required
def all_images():
    # Querying for the latest updated
    images = Image.query.order_by(Image.updated_at.desc()).all()
    return {"images": {image.id: image.to_dict() for image in images}}


# POST an image by a specific user
@image_routes.route("/user", methods=["POST"])
@login_required
def upload_image():

    # getting image from the request
    if "img" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["img"]

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a url key from s3_helpers.py,
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request
    print("current user:", current_user)
    print("URL:", url)

    # wtf is pulling out info from body of request and fills out the instance of the form
    form = ImageSubmitForm()
    # Manually inject csrf token into form
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # instantiate Image model class and fill with data from instantiated forms data where applicable
        new_image = Image(
            img=url,
            # flask_login allows us to get the current user from the request
            user_id=current_user.id,
            caption=form.data['caption']
        )
        # Commit the instantiated model to db
        db.session.add(new_image)
        db.session.commit()
        return {"Image": new_image.to_dict()}
