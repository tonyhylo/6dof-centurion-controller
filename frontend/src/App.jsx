import React, { useState, useEffect } from 'react';
import RobotCanvas from './components/RobotCanvas';

export default function App() {
  // 1. Array state keeping track of all 6 joint values in radians
  const [angles, setAngles] = useState([0, 0, 0, 0, 0, 0]);
  
  // 2. State keeping track of the final computed endpoint Cartesian coordinate 
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });

  // 3. Automated lifecycle loop: recalculate position whenever any slider shifts
  useEffect(() => {
    // Calling your global FastAPI bridge helper function
    window.solveKinematics(angles)
      .then(data => {
        if (data && data.position) {
          setPosition(data.position);
        }
      })
      .catch(err => console.error("API Kinematics Error: ", err));
  }, [angles]);

  // 4. Handler to update a single specific joint index in the state array
  const handleSliderChange = (index, value) => {
    const updatedAngles = [...angles];
    updatedAngles[index] = parseFloat(value);
    setAngles(updatedAngles);
  };

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* LEFT COLUMN: The 3D Render Viewport window */}
      <div style={{ flex: 1, height: '100%', position: 'relative', background: '#1a1a1a' }}>
        <RobotCanvas angles={angles} />
      </div>

      {/* RIGHT COLUMN: The Interactive Control Dashboard telemetry panel */}
      <div style={{ width: '400px', padding: '20px', background: '#f5f6fa', overflowY: 'auto', boxShadow: '-2px 0 10px rgba(0,0,0,0.1)' }}>
        <h2>6-DOF Controller Terminal</h2>
        <hr />

        {/* Telemetry Display Sub-card */}
        <div style={{ background: '#fff', padding: '15px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #dcdde1' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#2f3640' }}>End-Effector Pose (Meters)</h3>
          <p style={{ fontFamily: 'monospace', margin: '5px 0' }}><b>X:</b> {position.x.toFixed(4)}</p>
          <p style={{ fontFamily: 'monospace', margin: '5px 0' }}><b>Y:</b> {position.y.toFixed(4)}</p>
          <p style={{ fontFamily: 'monospace', margin: '5px 0' }}><b>Z:</b> {position.z.toFixed(4)}</p>
        </div>

        {/* Dynamic Generation Loop for the 6 Range Sliders */}
        <h3>Joint Space Configuration</h3>
        {angles.map((angle, index) => (
          <div key={index} style={{ marginBottom: '15px', background: '#fff', padding: '10px', borderRadius: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <label style={{ fontWeight: 'bold' }}>Joint {index + 1}</label>
              <span style={{ fontFamily: 'monospace' }}>{angle.toFixed(2)} rad</span>
            </div>
            <input 
              type="range"
              min="-3.14" // -180 degrees in radians
              max="3.14"  // +180 degrees in radians
              step="0.01"
              value={angle}
              onChange={(e) => handleSliderChange(index, e.target.value)}
              style={{ width: '100%', cursor: 'pointer' }}
            />
          </div>
        ))}
      </div>

    </div>
  );
}