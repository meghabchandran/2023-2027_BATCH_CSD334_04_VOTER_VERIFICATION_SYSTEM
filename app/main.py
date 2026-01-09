from fastapi import FastAPI
from app.db.database import engine
from app.db import models

app = FastAPI(title="Voter Verification Backend")

# Create DB tables
models.Base.metadata.create_all(bind=engine)


@app.get("/health")
def health_check():
    return {"status": "Backend is running"}
