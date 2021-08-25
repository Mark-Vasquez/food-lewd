from app.models import db, Image


def seed_images():
    image1 = Image(
        img="https://i.imgur.com/afLDwpG.jpeg",
        mimetype="jpeg",
        user_id=1,
        caption="This is a grilled cheese sandwich",
    )
    image2 = Image(
        img="https://i.imgur.com/Tl2aO7h.jpeg",
        mimetype="jpeg",
        user_id=2,
        caption="French toast is good",
    )

    db.session.add(image1)
    db.session.add(image2)

    db.session.commit()


def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
