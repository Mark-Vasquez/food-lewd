from flask import Blueprint
from flask_login import login_required
from app.models import Image
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

#
