from fastapi import APIRouter, Depends, HTTPException, Form, UploadFile, File
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db import models

router = APIRouter()

# ✅ GET VOTER BY ID
@router.get("/{voter_id}")
def get_voter(voter_id: str, db: Session = Depends(get_db)):
    voter = db.query(models.Voter).filter(models.Voter.voter_id == voter_id).first()
    
    if not voter:
        raise HTTPException(status_code=404, detail="Voter not found")
    
    return voter


# ✅ ADD NEW VOTER
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
    has_voted: bool = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Check if voter already exists
    existing_voter = db.query(models.Voter).filter(models.Voter.voter_id == voter_id).first()
    if existing_voter:
        raise HTTPException(status_code=400, detail="Voter already exists")

    # Save file path
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
        has_voted=has_voted,
        face_image_path=file_location
    )

    db.add(new_voter)
    db.commit()
    db.refresh(new_voter)

    return {"message": "Voter added successfully"}