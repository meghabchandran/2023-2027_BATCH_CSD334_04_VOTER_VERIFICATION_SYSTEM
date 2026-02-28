import os
from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db.models import Voter
from app.services.face_verification import verify_face

router = APIRouter(prefix="/voters", tags=["Voters"])

UPLOAD_FOLDER = "app/uploaded_faces"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# --------------------------
# Get Voter
# --------------------------

@router.get("/{voter_id}")
def get_voter(voter_id: str, db: Session = Depends(get_db)):
    voter = db.query(Voter).filter(Voter.voter_id == voter_id).first()

    if not voter:
        raise HTTPException(status_code=404, detail="Voter not found")

    return voter


# --------------------------
# Add Voter
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

    existing = db.query(Voter).filter(Voter.voter_id == voter_id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Voter already exists")

    # Save image
    file_path = os.path.join(UPLOAD_FOLDER, f"{voter_id}.jpg")

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    new_voter = Voter(
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
        face_image_path=file_path
    )

    db.add(new_voter)
    db.commit()

    return {"message": "Voter added successfully"}


# --------------------------
# Delete Voter
# --------------------------

@router.delete("/{voter_id}")
def delete_voter(voter_id: str, db: Session = Depends(get_db)):
    voter = db.query(Voter).filter(Voter.voter_id == voter_id).first()

    if not voter:
        raise HTTPException(status_code=404, detail="Voter not found")

    # Delete image also
    if voter.face_image_path and os.path.exists(voter.face_image_path):
        os.remove(voter.face_image_path)

    db.delete(voter)
    db.commit()

    return {"message": "Voter deleted successfully"}


# --------------------------
# Verify Face
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
        raise HTTPException(status_code=400, detail="Already voted")

    verified = verify_face(voter.face_image_path, file)

    return {"verified": verified}


# --------------------------
# Mark as Voted
# --------------------------

@router.post("/{voter_id}/vote")
def mark_voter_as_voted(voter_id: str, db: Session = Depends(get_db)):
    voter = db.query(Voter).filter(Voter.voter_id == voter_id).first()

    if not voter:
        raise HTTPException(status_code=404, detail="Voter not found")

    if voter.has_voted:
        raise HTTPException(status_code=400, detail="Duplicate voting blocked")

    voter.has_voted = True
    db.commit()

    return {"message": "Voter marked as voted"}