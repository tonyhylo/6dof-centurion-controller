import numpy as np
from .dh_parameters import UR5_PARAMS

# This class defines the kinematics engine for robot pose calculation
class KinematicsEngine:
    def __init__(self):
        self.params = UR5_PARAMS

    # This method calculates DH transformation
    def get_joint_matrix(self, theta, d, a, alpha):
        return np.array([
            [np.cos(theta), -np.sin(theta)*np.cos(alpha),  np.sin(theta)*np.sin(alpha), a*np.cos(theta)],
            [np.sin(theta),  np.cos(theta)*np.cos(alpha), -np.cos(theta)*np.sin(alpha), a*np.sin(theta)],
            [0,              np.sin(alpha),               np.cos(alpha),              d],
            [0,              0,                           0,                          1]
        ])

    # This method calculates the 4x4 pose matrix from the six individual joint angles
    def forward_kinematics(self, joint_angles):
        t_total = np.eye(4)
        
        for i, theta in enumerate(joint_angles):
            p = self.params[i]
            # Multiply current state by the next joint's matrix
            t_joint = self.get_joint_matrix(theta, p['d'], p['a'], p['alpha'])
            t_total = np.dot(t_total, t_joint)
            
        return t_total