from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.db.models import Voter
from app.services.face_verification import verify_face

router = APIRouter()

# --------------------------
# Get Voter Details
# --------------------------


@router.get("/{voter_id}")
def get_voter(voter_id: str, db: Session = Depends(get_db)):
    voter = db.query(Voter).filter(Voter.voter_id == voter_id).first()

    if not voter:
        raise HTTPException(status_code=404, detail="Voter not found")

    if voter.has_voted:
        return {
            "voter_id": voter.voter_id,
            "has_voted": True
        }

    return {
        "voter_id": voter.voter_id,
        "name": voter.name,
        "age": voter.age,
        "booth_id": voter.booth_id,
        "has_voted": voter.has_voted
    }

# --------------------------
# Verify Face Endpoint
# --------------------------


@router.post("/{voter_id}/verify-face")
def verify_voter_face(
    voter_id: str,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    voter = db.query(Voter).filter(Voter.voter_id == voter_id).first()

    if not voter:
        raise HTTPException(status_code=404, detail="Voter not found")

    if voter.has_voted:
        raise HTTPException(status_code=400, detail="Voter already voted")

    verified = verify_face(voter.face_image_path, file)

    if verified:
        return {"verified": True}

    return {
        "verified": False,
        "message": "Face does not match"
    }

# --------------------------
# Mark Voter as Voted
# --------------------------


@router.post("/{voter_id}/vote")
def mark_voter_as_voted(
    voter_id: str,
    db: Session = Depends(get_db)
):
    voter = db.query(Voter).filter(Voter.voter_id == voter_id).first()

    if not voter:
        raise HTTPException(status_code=404, detail="Voter not found")

    if voter.has_voted:
        raise HTTPException(status_code=400, detail="Duplicate voting blocked")

    voter.has_voted = True
    db.commit()

    return {"message": "Voter marked as voted"}
