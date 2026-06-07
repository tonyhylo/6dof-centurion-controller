import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import RobotLink from './RobotLink';



export default function RobotCanvas({ angles }) {
    

    return (
        <Canvas camera={{ position: [2, 2, 2], fov: 50 }} style={{ width: '100%', height: '100%' }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <Grid infiniteGrid cellSize={0.1} sectionSize={0.5} fadeDistance={10} />
            <OrbitControls />
             {/* JOINT 1 */}
            <group rotation={[0, angles[0], 0]}>
                <RobotLink length={0.25} radius={0.08} color="#2c3e50">
                    {/* JOINT 2  */}
                    <group rotation={[angles[1], 0, 0]}>
                        <RobotLink length={0.45} radius={0.06} color="#3498db">
                            {/* JOINT 3  */}
                            <group rotation={[angles[2], 0, 0]}>
                                <RobotLink length={0.40} radius={0.045} color="#ecf0f1">
                                    {/* JOINT 4  */}
                                    <group rotation={[0, angles[3], 0]}>
                                        <RobotLink length={0.15} radius={0.035} color="#2c3e50">
                                            {/* JOINT 5  */}
                                            <group rotation={[angles[4], 0, 0]}>
                                                <RobotLink length={0.10} radius={0.03} color="#e74c3c">
                                                    {/* JOINT 6  */}
                                                    <group rotation={[0, angles[5], 0]}>
                                                        <RobotLink length={0.04} radius={0.025} color="#f1c40f"/>
                                                    </group>
                                                </RobotLink>
                                            </group>
                                        </RobotLink>
                                    </group>
                                </RobotLink>
                            </group>
                        </RobotLink>
                    </group>
                </RobotLink>
            </group>
        </Canvas>
    );
}