from app.models import db, Image


def seed_images():
    image1 = Image(
        img="https://i.imgur.com/afLDwpG.jpeg",
        user_id=1,
        caption="This is a grilled cheese sandwich",
    )
    image2 = Image(
        img="https://i.imgur.com/Tl2aO7h.jpeg",
        user_id=1,
        caption="This is a french toast",
    )
    image3 = Image(
        img="https://i.imgur.com/7g3KWJu.jpeg",
        user_id=1,
        caption="Salmon Wellington to DIE for!",
    )
    image4 = Image(
        img="https://i.imgur.com/JSB89us.jpeg",
        user_id=2,
        caption="Healthy chix",
    )
    image5 = Image(
        img="https://i.imgur.com/krSRFka.jpeg",
        user_id=2,
        caption="Keto recipessss",
    )
    image6 = Image(
        img="https://i.imgur.com/UPUnh9s.jpeg",
        user_id=2,
        caption="A light snack",
    )
    image7 = Image(
        img="https://i.imgur.com/PmqTKo7.jpeg",
        user_id=3,
        caption="I need to lose a few kilos......",
    )
    image8 = Image(
        img="https://i.imgur.com/08j7Smr.jpeg",
        user_id=3,
        caption="I eat veggies toooooooo",
    )
    image9 = Image(
        img="https://i.imgur.com/JeHFzQf.jpeg",
        user_id=3,
        caption="burger SMAASSHHHHHHHHH",
    )
    image10 = Image(
        img="https://i.imgur.com/KUnPk39.jpeg",
        user_id=3,
        caption="PASTA",
    )

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.add(image4)
    db.session.add(image5)
    db.session.add(image6)
    db.session.add(image7)
    db.session.add(image8)
    db.session.add(image9)
    db.session.add(image10)

    db.session.commit()


def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
