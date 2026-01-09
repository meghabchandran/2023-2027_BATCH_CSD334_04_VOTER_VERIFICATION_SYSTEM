from sqlalchemy import Column, String, Integer, Boolean
from .database import Base


class Voter(Base):
    __tablename__ = "voters"

    voter_id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    age = Column(Integer, nullable=False)
    booth_id = Column(String, nullable=False)
    has_voted = Column(Boolean, default=False)
    face_image_path = Column(String, nullable=False)
