from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import random

router = APIRouter(
    prefix="/api/auth",
    tags=["Auth"]
)

# This acts as our temporary database
otp_store = {}

class OTPRequest(BaseModel):
    mobile_number: str

class OTPVerify(BaseModel):
    username: str
    password: str
    mobile_number: str
    otp_code: str

# --- STEP 1: REQUEST OTP ---
@router.post("/request-otp")
def request_otp(data: OTPRequest):
    # Generate random 4-digit OTP
    otp = str(random.randint(1000, 9999))

    # Store it: Key = Phone Number, Value = OTP
    otp_store[data.mobile_number] = otp

    #  This is the "Delivery"
    print("\n" + "="*30)
    print(f"DEBUG: SMS Sent to {data.mobile_number}")
    print(f"CODE: {otp}")
    print("="*30 + "\n")

    # Don't return the OTP in the JSON, otherwise the demo is too easy!
    return {"message": "OTP sent successfully. Please check the server console."}

# --- STEP 2: VERIFY OTP ---
@router.post("/verify-otp")
def verify_otp(data: OTPVerify):

    # Check if OTP exists
    if data.mobile_number not in otp_store:
        raise HTTPException(status_code=404, detail="No OTP requested for this number")

    # Check OTP match
    if otp_store[data.mobile_number] != data.otp_code:
        raise HTTPException(status_code=400, detail="Invalid OTP code")

    # OPTIONAL (Demo Login Check)
    # Since you don't yet have users table,
    # we simulate login validation.
    if not data.username or not data.password:
        raise HTTPException(status_code=400, detail="Username and password required")

    # Clear OTP after success
    del otp_store[data.mobile_number]

    return {
        "success": True,
        "message": "Login Successful",
        "role": "data_entry"
    }