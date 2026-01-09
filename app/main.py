from fastapi import FastAPI

app = FastAPI(title="Voter Verification Backend")


@app.get("/health")
def health_check():
    return {"status": "Backend is running"}
