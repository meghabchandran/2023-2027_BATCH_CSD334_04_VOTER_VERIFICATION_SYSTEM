from fastapi import FastAPI
from app.db.database import engine
from app.db import models
from app.api.voters import router as voter_router
from app.api.booths import router as booth_router
from app.core.cors import add_cors
from app.db.seed_voters import seed_voters


# ----------------------------
# Create FastAPI App FIRST
# ----------------------------
app = FastAPI(title="Voter Verification Backend")


# ----------------------------
# Enable CORS
# ----------------------------
add_cors(app)


# ----------------------------
# Create Database Tables
# ----------------------------
models.Base.metadata.create_all(bind=engine)


# ----------------------------
# Seed Initial Dummy Data
# ----------------------------
seed_voters()


# ----------------------------
# Register Routers
# ----------------------------
app.include_router(voter_router, prefix="/api/voters", tags=["Voters"])
app.include_router(booth_router, prefix="/api/booths", tags=["Booths"])


# ----------------------------
# Health Check Endpoint
# ----------------------------
@app.get("/health")
def health_check():
    return {"status": "Backend is running"}