from sqlalchemy import Column, String, Integer, Boolean
from .database import Base
class Voter(Base):
    __tablename__ = "voters"

    voter_id = Column(String, primary_key=True)
    name = Column(String)
    age = Column(Integer) 
    fathers_name = Column(String)
    spouse_name = Column(String)
    gender = Column(String)
    address = Column(String)
    dob = Column(String)
    booth_id = Column(String)
    aadhaar_id = Column(String)
    has_voted = Column(Boolean, default=False)
    face_image_path = Column(String)
