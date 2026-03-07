from fastapi.middleware.cors import CORSMiddleware

def add_cors(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # allow all origins (safe for mini project)
        allow_credentials=True,
        allow_methods=["*"],  # GET, POST, etc.
        allow_headers=["*"],
    )
