from fastapi import APIRouter, Depends, HTTPException, Form, UploadFile, File
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.db.database import get_db
from app.db import models
import os

router = APIRouter()


# --------------------------
# GET VOTER BY ID
# --------------------------
@router.get("/{voter_id}")
def get_voter(voter_id: str, db: Session = Depends(get_db)):

    # Clean voter ID (remove spaces)
    voter_id = voter_id.strip()

    # Case-insensitive search
    voter = db.query(models.Voter).filter(
        func.lower(models.Voter.voter_id) == voter_id.lower()
    ).first()

    if not voter:
        raise HTTPException(status_code=404, detail="Voter not found")

    return voter


# --------------------------
# ADD NEW VOTER
# --------------------------
@router.post("/add")
async def add_voter(
    voter_id: str = Form(...),
    name: str = Form(...),
    age: int = Form(...),
    fathers_name: str = Form(...),
    spouse_name: str = Form(...),
    gender: str = Form(...),
    address: str = Form(...),
    dob: str = Form(...),
    booth_id: str = Form(...),
    aadhaar_id: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    voter_id = voter_id.strip()

    # Check if voter already exists (case-insensitive)
    existing_voter = db.query(models.Voter).filter(
        func.lower(models.Voter.voter_id) == voter_id.lower()
    ).first()

    if existing_voter:
        raise HTTPException(status_code=400, detail="Voter already exists")

    # Ensure folder exists
    os.makedirs("app/sample_data/faces", exist_ok=True)

    # Save image file
    file_location = f"app/sample_data/faces/{voter_id}.jpg"
    with open(file_location, "wb") as buffer:
        buffer.write(await file.read())

    new_voter = models.Voter(
        voter_id=voter_id,
        name=name,
        age=age,
        fathers_name=fathers_name,
        spouse_name=spouse_name,
        gender=gender,
        address=address,
        dob=dob,
        booth_id=booth_id,
        aadhaar_id=aadhaar_id,
        has_voted=False,  # Always default to False
        face_image_path=file_location
    )

    db.add(new_voter)
    db.commit()
    db.refresh(new_voter)

    return {"message": "Voter added successfully"}