from fastapi import FastAPI
from app.db.database import engine
from app.db import models
from app.api.voters import router as voter_router
from app.core.cors import add_cors
from app.db.seed_voters import seed_voters
from app.api.auth import router as auth_router

app = FastAPI(title="Voter Verification Backend")

# Enable CORS
add_cors(app)

# Create DB tables
models.Base.metadata.create_all(bind=engine)

# Seed database
seed_voters()

# Register voter APIs
app.include_router(voter_router, prefix="/api/voters", tags=["Voters"])

# Register auth APIs
app.include_router(auth_router)

@app.get("/health")
def health_check():
    return {"status": "Backend is running"}