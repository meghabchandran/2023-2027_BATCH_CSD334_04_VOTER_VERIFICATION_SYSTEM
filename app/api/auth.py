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
    mobile_number: str
    otp_code: str

# --- STEP 1: REQUEST OTP ---
@router.post("/request-otp")
def request_otp(data: OTPRequest):
    # Generate random 4-digit OTP
    otp = str(random.randint(1000, 9999))

    # Store it: Key = Phone Number, Value = OTP
    otp_store[data.mobile_number] = otp

    # CONSOLE LOG METHOD: This is the "Delivery"
    print("\n" + "="*30)
    print(f"DEBUG: SMS Sent to {data.mobile_number}")
    print(f"CODE: {otp}")
    print("="*30 + "\n")

    # Don't return the OTP in the JSON, otherwise the demo is too easy!
    return {"message": "OTP sent successfully. Please check the server console."}

# --- STEP 2: VERIFY OTP ---
@router.post("/verify-otp")
def verify_otp(data: OTPVerify):
    # Check if the number exists in our store
    if data.mobile_number not in otp_store:
        raise HTTPException(status_code=404, detail="No OTP requested for this number")

    # Check if the code matches
    if otp_store[data.mobile_number] == data.otp_code:
        # Success! Clear the OTP so it can't be used twice
        del otp_store[data.mobile_number]
        return {"success": True, "message": "Login Successful"}
    else:
        raise HTTPException(status_code=400, detail="Invalid OTP code")