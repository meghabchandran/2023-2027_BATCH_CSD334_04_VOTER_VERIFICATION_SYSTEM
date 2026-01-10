from app.db.database import SessionLocal
from app.db.models import Voter

def seed_voters():
    db = SessionLocal()

    voters = [
        Voter(
            voter_id="V001",
            name="Ananya Sharma",
            age=24,
            booth_id="B01",
            has_voted=False,
            face_image_path="app/sample_data/faces/V001.jpg"
        ),
        Voter(
            voter_id="V002",
            name="Rahul Verma",
            age=32,
            booth_id="B02",
            has_voted=False,
            face_image_path="app/sample_data/faces/V002.jpg"
        ),
        Voter(
            voter_id="V003",
            name="Priya Nair",
            age=29,
            booth_id="B01",
            has_voted=False,
            face_image_path="app/sample_data/faces/V003.jpg"
        ),
        Voter(
            voter_id="V004",
            name="Amitabh Singh",
            age=45,
            booth_id="B03",
            has_voted=False,
            face_image_path="app/sample_data/faces/V004.jpg"
        ),
        Voter(
            voter_id="V005",
            name="Sneha Gupta",
            age=22,
            booth_id="B02",
            has_voted=False,
            face_image_path="app/sample_data/faces/V005.jpg"
        ),
    ]

    for voter in voters:
        existing = db.query(Voter).filter(Voter.voter_id == voter.voter_id).first()
        if not existing:
            db.add(voter)

    db.commit()
    db.close()
    print("✅ Dummy voters inserted successfully")

if __name__ == "__main__":
    seed_voters()
