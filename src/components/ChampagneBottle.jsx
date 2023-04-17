import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function ChampagneBottle(props) {
  const { nodes, materials } = useGLTF("/public/models/champagne_model.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.New_Bottle002.geometry}
        material={materials.Bottle}
        position={[-0.11, 0.62, 0.81]}
        scale={[0.62, 0.59, 0.62]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.New_Bottle_Neck002.geometry}
          material={materials["Bottle_Top.001"]}
          position={[0, 3.63, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.New_Muselet_Cover002.geometry}
          material={materials["Bottle_Top.001"]}
          position={[0, 5.81, 0.01]}
          rotation={[1.57, 0.02, 0]}
          scale={[1.71, 1.71, 1.69]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.New_Squares002.geometry}
          material={materials.Silver_circle}
          position={[0, 5.03, 0]}
          rotation={[1.57, 0.02, 0]}
          scale={[1.71, 1.71, 1.69]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.New_Logo002.geometry}
          material={materials.Logo}
          position={[0.01, 3.55, 1.85]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.21, 0.18, 0.19]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.New_Label002.geometry}
          material={materials.Ticket}
          position={[-0.01, 0.26, 1.85]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.8, 0.8, 0.82]}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/public/models/champagne_model.glb");