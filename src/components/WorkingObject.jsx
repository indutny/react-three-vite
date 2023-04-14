import { useGLTF, useScroll, Torus } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import React, { useLayoutEffect, useRef } from "react";

import * as THREE from 'three'

const bottleMaterial = new THREE.MeshPhysicalMaterial({
    color: '#efefef',
    transmission: 1,
    roughness: 0.35,
    thickness: 500,
    envMapIntensity: 4,
  })

export function WorkingObject(props) {
  const ref = useRef();
  const tl = useRef();

  const scroll = useScroll();

  useFrame(() => {
    tl.current.seek(scroll.offset * tl.current.duration());
  });

  useLayoutEffect(() => {
    tl.current = gsap.timeline();

    tl.current.to(
        ref.current.rotation,
        { duration: 3, x: 0, y: Math.PI, z: 0 },
        0
      );
  }, 
  []);

  return (
    <group
      {...props}
      dispose={null}
      ref={ref}
      position={[0, 0, 0]}
      rotation={[0, -Math.PI / 3, 0]}
    >
        <Torus material={bottleMaterial}/>
    </group>
  );
}
