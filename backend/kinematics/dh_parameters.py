import numpy as np

# This exact variable name must match word-for-word, case-sensitive
UR5_PARAMS = [
    {'d': 0.089159, 'a': 0,        'alpha': np.pi/2},  # Joint 1 (Base)
    {'d': 0,        'a': -0.425,   'alpha': 0},        # Joint 2 (Shoulder)
    {'d': 0,        'a': -0.39225, 'alpha': 0},        # Joint 3 (Elbow)
    {'d': 0.10915,  'a': 0,        'alpha': np.pi/2},  # Joint 4 (Wrist 1)
    {'d': 0.09465,  'a': 0,        'alpha': -np.pi/2}, # Joint 5 (Wrist 2)
    {'d': 0.0823,   'a': 0,        'alpha': 0}         # Joint 6 (Wrist 3)
]