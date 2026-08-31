"use client";
import "./HeroDissolve.css";
import { RefObject, useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { vertexShader, fragmentShader } from "../../lib/Shaders";

gsap.registerPlugin(ScrollTrigger);

type HeroDissolveProps = {
  containerRef: RefObject<HTMLElement>;
  color?: string;
  spread?: number;
};

function hexToVec3(hex: string): THREE.Vector3 {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return new THREE.Vector3(0.96, 0.95, 0.91);
  return new THREE.Vector3(
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
  );
}

const HeroDissolve = ({
  containerRef,
  color = "#f4f1ea",
  spread = 0.5,
}: HeroDissolveProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
    });

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uProgress: { value: 0 },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uColor: { value: hexToVec3(color) },
        uSpread: { value: spread },
      },
      transparent: true,
    });

    const setSize = () => {
      const { width, height } = container.getBoundingClientRect();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      material.uniforms.uResolution.value.set(width, height);
    };

    setSize();

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    let frameId: number;
    const renderLoop = () => {
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(renderLoop);
    };
    renderLoop();

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        material.uniforms.uProgress.value = self.progress;
      },
    });

    window.addEventListener("resize", setSize);

    return () => {
      cancelAnimationFrame(frameId);
      trigger.kill();
      window.removeEventListener("resize", setSize);
      renderer.dispose();
      material.dispose();
      mesh.geometry.dispose();
    };
  }, [containerRef, color, spread]);

  return <canvas ref={canvasRef} className='hero-dissolve-canvas' />;
};

export default HeroDissolve;
