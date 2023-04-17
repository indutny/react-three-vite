import * as THREE from 'three'
import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { useGLTF, useScroll, Torus } from "@react-three/drei";
import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';

import { ChampagneBottle } from '/src/components/ChampagneBottle.jsx'

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
    const [screenWidth, setScreenWidth] = useState(0);
    const [rotation, setRotation] = useState([0, 0, 0]);
  
    const { viewport } = useThree();
    const scroll = useScroll();
  
    useEffect(() => {
      const handleResize = () => {
        setScreenWidth(viewport.width);
      };
      handleResize(); // Set initial screen width on mount
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, [viewport.width]);
  
    useLayoutEffect(() => {
        //console.log('screenWidth:', screenWidth);
        //console.log('ref.current.rotation:', ref.current.rotation);

      if (!tl.current) {
        tl.current = gsap.timeline({ paused: true });
      }
      tl.current.clear();
      tl.current.to(ref.current.rotation, { duration: 3, x: 0, y: Math.PI, z: 0 }, 0);
      tl.current.to(ref.current.position, { duration: 3, x: screenWidth / 4, y: 0, z: 0 }, 0);
      tl.current.seek(scroll.offset * tl.current.duration());
      tl.current.restart();
    }, [screenWidth]);
  
    useFrame(() => {
        //console.log('ref.current.rotation:', ref.current.rotation);
        tl.current.seek(scroll.offset * tl.current.duration());
      });
  
    const meshRotation = [0, 0, 0];
    const meshPosition = [-screenWidth / 4, 0, 0];
  
    return (
      <group {...props} dispose={null} ref={ref} position={meshPosition} rotation={meshRotation}>
        <Torus material={bottleMaterial} />
      </group>
    );
  }