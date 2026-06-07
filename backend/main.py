from fastapi import FastAPI
from pydantic import BaseModel
from kinematics.solver import KinematicsEngine
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

# This launches the FastAPI
app = FastAPI() 

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            # Allows your specific frontend domain
    allow_credentials=True,
    allow_methods=["*"],              # Allows GET, POST, OPTIONS, etc.
    allow_headers=["*"],              # Allows all custom headers
)

engine = KinematicsEngine()

# This class assigns the values of angles
class JointAngles(BaseModel):
    angles: list[float]

@app.post("/solve")
# This async function solves kinematics from six input joint angles
async def solve_kinematics(data: JointAngles):
    matrix = engine.forward_kinematics(data.angles)
    
    position = {
        "x": matrix[0, 3],
        "y": matrix[1, 3],
        "z": matrix[2, 3]
    }
    
    return {
        "full_matrix": matrix.tolist(),
        "position": position
    }