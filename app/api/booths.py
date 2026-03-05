from fastapi import APIRouter, Form, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db.models import Booth

router = APIRouter(tags=["Booths"])


@router.post("/add")
def add_booth(
    booth_id: str = Form(...),
    location: str = Form(...),
    officer_name: str = Form(...),
    db: Session = Depends(get_db)
):
    existing = db.query(Booth).filter(Booth.booth_id == booth_id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Booth already exists")

    new_booth = Booth(
        booth_id=booth_id,
        location=location,
        officer_name=officer_name
    )

    db.add(new_booth)
    db.commit()

    return {"message": "Booth added successfully"}


@router.delete("/{booth_id}")
def delete_booth(booth_id: str, db: Session = Depends(get_db)):
    booth = db.query(Booth).filter(Booth.booth_id == booth_id).first()

    if not booth:
        raise HTTPException(status_code=404, detail="Booth not found")

    db.delete(booth)
    db.commit()

    return {"message": "Booth deleted successfully"}