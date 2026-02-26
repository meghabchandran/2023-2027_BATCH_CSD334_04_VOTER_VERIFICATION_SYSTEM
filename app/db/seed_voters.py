from app.db.database import SessionLocal
from app.db.models import Voter
from app.db import models
from app.db.database import engine

# Create tables if they don't exist
models.Base.metadata.create_all(bind=engine)


def seed_voters():
    db = SessionLocal()

    voters = [
        Voter(
            voter_id="V001",
            name="Akshaja Biju",
            age=21,
            fathers_name="Biju",
            spouse_name="N/A",
            gender="Female",
            address="Thrissur",
            dob="2005-09-07",
            booth_id="B01",
            aadhaar_id="856142378659",
            has_voted=False,
            face_image_path="app/sample_data/faces/V001.jpg"
        ),
        Voter(
            voter_id="V002",
            name="Krishnapriya Vinod",
            age=21,
            fathers_name="Vinod",
            spouse_name="N/A",
            gender="Female",
            address="Alappuzha",
            dob="2005-08-23",
            booth_id="B02",
            aadhaar_id="7784663259843",
            has_voted=False,
            face_image_path="app/sample_data/faces/V002.jpg"
        ),
        Voter(
            voter_id="V003",
            name="Malavika S",
            age=20,
            fathers_name="Money",
            spouse_name="N/A",
            gender="Female",
            address="Mavelikkara",
            dob="2005-06-15",
            booth_id="B01",
            aadhaar_id="623456789012",
            has_voted=False,
            face_image_path="app/sample_data/faces/V003.jpg"
        ),
        Voter(
            voter_id="V004",
            name="Megha B Chandran",
            age=22,
            fathers_name="Biji Chandran",
            spouse_name="N/A",
            gender="Female",
            address="Pathanamthitta",
            dob="2004-04-17",
            booth_id="B03",
            aadhaar_id="856142378659",
            has_voted=False,
            face_image_path="app/sample_data/faces/V004.jpg"
        ),
        Voter(
            voter_id="V005",
            name="Sneha Gupta",
            age=25,
            fathers_name="Ramesh Gupta",
            spouse_name="N/A",
            gender="Female",
            address="89, Park Avenue, Kochi",
            dob="2001-11-20",
            booth_id="B02",
            aadhaar_id="AAD345",
            has_voted=False,
            face_image_path="app/sample_data/faces/V005.jpg"
        ),
        Voter(
            voter_id="V006",
            name="Ananya Sharma",
            age=26,
            fathers_name="Rajesh Sharma",
            spouse_name="N/A",
            gender="Female",
            address="33, Brigade Road, Bangalore",
            dob="2000-07-12",
            booth_id="B03",
            aadhaar_id="AAD678",
            has_voted=False,
            face_image_path="app/sample_data/faces/V001.jpg"
        ),
    ]

    for voter in voters:
        existing = db.query(Voter).filter(
            Voter.voter_id == voter.voter_id).first()
        if not existing:
            db.add(voter)

    db.commit()
    db.close()
    print("✅ Dummy voters inserted successfully")


if __name__ == "__main__":
    seed_voters()