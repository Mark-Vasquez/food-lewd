from app.models import db, Comment


def seed_comments():
    comment1 = Comment(
        content="This grilled cheese sammy is lit! wowza!",
        user_id=3,
        image_id=1,
    )
    comment2 = Comment(
        content="That grilled cheese is meh",
        user_id=3,
        image_id=1,
    )
    comment3 = Comment(
        content="Is this dairy free or nah?!",
        user_id=3,
        image_id=1,
    )
    comment4 = Comment(
        content="Breakfast game on point brooooo",
        user_id=1,
        image_id=2,
    )
    comment5 = Comment(
        content="Nice french toast! Bonjour!",
        user_id=2,
        image_id=2,
    )
    comment6 = Comment(
        content="Yummo those toasts go dummo",
        user_id=3,
        image_id=2,
    )
    comment7 = Comment(
        content="Interesting way to prepare salmon.......",
        user_id=3,
        image_id=3,
    )
    comment8 = Comment(
        content="Salmon en Croute?",
        user_id=3,
        image_id=3,
    )
    comment9 = Comment(
        content="SALLY-MON YEAH MON",
        user_id=3,
        image_id=3,
    )
    comment10 = Comment(
        content="Gross man",
        user_id=3,
        image_id=4,
    )

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.add(comment8)
    db.session.add(comment9)
    db.session.add(comment10)

    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
