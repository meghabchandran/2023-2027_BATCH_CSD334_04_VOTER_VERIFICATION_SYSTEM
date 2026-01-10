from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.db.models import Voter

router = APIRouter()

@router.get("/{voter_id}")
def get_voter(voter_id: str, db: Session = Depends(get_db)):
    voter = db.query(Voter).filter(Voter.voter_id == voter_id).first()

    if not voter:
        raise HTTPException(status_code=404, detail="Voter not found")

    # If voter has already voted, return limited response
    if voter.has_voted:
        return {
            "voter_id": voter.voter_id,
            "has_voted": True
        }

    # Normal response
    return {
        "voter_id": voter.voter_id,
        "name": voter.name,
        "age": voter.age,
        "booth_id": voter.booth_id,
        "has_voted": voter.has_voted
    }
