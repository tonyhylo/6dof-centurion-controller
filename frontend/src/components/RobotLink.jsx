import React from 'react';

export default function RobotLink({ length, radius, color, children }) {
    const jointHousingRadius = radius * 1.55;

    return (
        <group>
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[jointHousingRadius, 32, 32]} />
                <meshStandardMaterial color={color} />
            </mesh>
            <mesh position={[0, length / 2, 0]}>
                <cylinderGeometry args={[radius, radius, length, 64]}/>
                <meshStandardMaterial color={color} />

                <mesh position={[0, 0, radius * 0.95]}> 
                    <boxGeometry args={[radius * 0.2, length * 0.9, radius * 0.1]} />
                    <meshStandardMaterial color="#2c3e50" roughness={0.5} />
                </mesh>
            </mesh>
            <group position={[0, length, 0]}>
                {children}
            </group>
        </group>
    );
}