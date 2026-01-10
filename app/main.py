from fastapi import FastAPI
from app.db.database import engine
from app.db import models
from app.api.voters import router as voter_router

app = FastAPI(title="Voter Verification Backend")

# Create DB tables
models.Base.metadata.create_all(bind=engine)

# Register voter APIs
app.include_router(voter_router, prefix="/api/voters", tags=["Voters"])

@app.get("/health")
def health_check():
    return {"status": "Backend is running"}
