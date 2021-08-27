from app.models import db, Comment


def seed_comments():
    comment1 = Comment(
        content="This grilled cheese sammy is lit! wowza!",
        user_id=2,
        image_id=1,
    )
    comment2 = Comment(
        content="Nice french toast! Bonjour!",
        user_id=3,
        image_id=2,
    )

    db.session.add(comment1)
    db.session.add(comment2)

    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
