import * as THREE from 'three'
import { Vector3 } from 'three'
import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, ScrollControls, SpotLight, PerformanceMonitor, Environment, Lightformer, Float, useDepthBuffer } from '@react-three/drei'
import { LayerMaterial, Color, Depth } from 'lamina'

import gsap, { Power3 } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { WorkingObject } from './components/WorkingObject'
gsap.registerPlugin(ScrollTrigger)

export default function App() {
  return (
    <Canvas shadows camera={{ position: [0, 0, 15], fov: 30 }}>
      {/* Renders contents "live" into a HDRI environment (scene.environment). */}
      <Environment /*frames={degraded ? 1 : Infinity}*/ resolution={256} background blur={1}>
        <Lightformers />
      </Environment>
      <Scene />
    </Canvas>
  )
}
 
function Scene() {
  // This is a super cheap depth buffer that only renders once (frames: 1 is optional!), which works well for static scenes
  // Spots can optionally use that for realism, learn about soft particles here: http://john-chapman-graphics.blogspot.com/2013/01/good-enough-volumetrics-for-spotlights.html
  //const depthBuffer = useDepthBuffer({ frames: 1 })
  return (
    <>
    <SpotLight
        position={[0, 5, 0]}
        distance={5}
        angle={0.30}
        attenuation={5}
        anglePower={5} // Diffuse-cone anglePower (default: 5)
      />
      <ScrollControls pages={3} damping={0.25}>
        <WorkingObject />
      </ScrollControls>
    </>
  )
}


// Enviroment Light for scene
function Lightformers({ positions = [2, 0, 2, 0, 2, 0, 2, 0] }) {
  const group = useRef()
  useFrame((state, delta) => (group.current.position.z += delta * 10) > 20 && (group.current.position.z = -60))
  return (
    <>
      {/* Ceiling */}
      <Lightformer intensity={0.75} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
      <group rotation={[0, 0.5, 0]}>
        <group ref={group}>
          {positions.map((x, i) => (
            <Lightformer key={i} form="circle" intensity={2} rotation={[Math.PI / 2, 0, 0]} position={[x, 4, i * 4]} scale={[3, 1, 1]} />
          ))}
        </group>
      </group>
      {/* Sides */}
      <Lightformer intensity={4} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.1, 1]} />
      <Lightformer rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.5, 1]} />
      <Lightformer rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} />
      {/* Accent (red) */}
      <Float speed={5} floatIntensity={2} rotationIntensity={2}>
        <Lightformer form="ring" color="white" intensity={1} scale={10} position={[-15, 4, -18]} target={[0, 0, 0]} />
      </Float>
      {/* Background */}
      <mesh scale={100}>
        <sphereGeometry args={[1, 64, 64]} />
        <LayerMaterial side={THREE.BackSide}>
          <Color color="black" alpha={1} mode="normal" />
          <Depth colorA="blue" colorB="black" alpha={0.5} mode="normal" near={0} far={300} origin={[100, 100, 100]} />
        </LayerMaterial>
      </mesh>
    </>
  )
}