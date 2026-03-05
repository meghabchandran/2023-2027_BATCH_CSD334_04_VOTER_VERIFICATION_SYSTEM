from fastapi import APIRouter, Depends, HTTPException, Form, UploadFile, File
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.db.database import get_db
from app.db import models
from app.services.face_verification import verify_face
import os
import re

router = APIRouter()

# --------------------------
# GET VOTER BY ID
# --------------------------
@router.get("/{voter_id}")
def get_voter(voter_id: str, db: Session = Depends(get_db)):
    voter_id = voter_id.strip()

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
    spouse_name: str = Form(None),  # OPTIONAL
    gender: str = Form(...),
    address: str = Form(...),
    dob: str = Form(...),
    booth_id: str = Form(...),
    aadhaar_id: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    voter_id = voter_id.strip()

    # 🔎 Check duplicate voter
    existing = db.query(models.Voter).filter(
        func.lower(models.Voter.voter_id) == voter_id.lower()
    ).first()

    if existing:
        raise HTTPException(status_code=400, detail="Voter already exists")

    # 🔎 Age validation
    if age < 18:
        raise HTTPException(status_code=400, detail="Voter must be 18 years or older")

    # 🔎 Aadhaar validation
    if not re.fullmatch(r"\d{12}", aadhaar_id):
        raise HTTPException(status_code=400, detail="Aadhaar must be exactly 12 digits")

    # 📁 Save face image
    os.makedirs("app/sample_data/faces", exist_ok=True)
    file_location = f"app/sample_data/faces/{voter_id}.jpg"

    contents = await file.read()
    with open(file_location, "wb") as f:
        f.write(contents)

    # 🧾 Create voter object
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
        has_voted=False,
        face_image_path=file_location
    )
    db.add(new_voter)
    db.commit()
    db.refresh(new_voter)
    return {"message": "Voter added successfully"}


# --------------------------
# VERIFY FACE
# --------------------------
@router.post("/{voter_id}/verify-face")
async def verify_voter_face(
    voter_id: str,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    voter_id = voter_id.strip()

    voter = db.query(models.Voter).filter(
        func.lower(models.Voter.voter_id) == voter_id.lower()
    ).first()

    if not voter:
        raise HTTPException(status_code=404, detail="Voter not found")

    if not voter.face_image_path:
        raise HTTPException(status_code=400, detail="No reference image found")

    result = await verify_face(voter.face_image_path, file)

    if not result:
        raise HTTPException(status_code=401, detail="Face does not match")

    return {"message": "Face verified successfully"}


# --------------------------
# MARK AS VOTED
# --------------------------
@router.post("/{voter_id}/vote")
def mark_as_voted(voter_id: str, db: Session = Depends(get_db)):
    voter_id = voter_id.strip()

    voter = db.query(models.Voter).filter(
        func.lower(models.Voter.voter_id) == voter_id.lower()
    ).first()

    if not voter:
        raise HTTPException(status_code=404, detail="Voter not found")

    if voter.has_voted:
        raise HTTPException(status_code=400, detail="Voter has already voted")

    voter.has_voted = True
    db.commit()
    db.refresh(voter)

    return {"message": "Voter marked as voted successfully"}