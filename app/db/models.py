from sqlalchemy import Column, String, Integer, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base


class Booth(Base):
    __tablename__ = "booths"

    booth_id = Column(String, primary_key=True, index=True)
    location = Column(String, nullable=False)
    booth_name = Column(String)

    voters = relationship("Voter", back_populates="booth")


class Voter(Base):
    __tablename__ = "voters"

    voter_id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    age = Column(Integer, nullable=False)
    fathers_name = Column(String)
    spouse_name = Column(String)
    gender = Column(String)
    address = Column(String)
    dob = Column(String)
    booth_id = Column(String, ForeignKey("booths.booth_id"))
    aadhaar_id = Column(String, unique=True)
    has_voted = Column(Boolean, default=False)
    face_image_path = Column(String)

    booth = relationship("Booth", back_populates="voters")