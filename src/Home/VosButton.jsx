import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = /* glsl */ `
precision highp float;
varying vec2 vUv;

// 2D Simplex Noise from VOS9X
vec3 permute(vec3 x) {
    return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

uniform float uTime;
uniform vec2 uBlackPosition;
uniform float uBlackRadius;
uniform float uBlackTimeScale;
uniform float uBlackBorderFade;
uniform float uBlackAlpha;

uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;

uniform float uTimeScale;
uniform float uScale;
uniform float uScale3;

uniform float uScaleVignette;
uniform float uVignetteBorderFade;
uniform float uAlpha;

vec3 saturate(vec3 a) {
    return clamp(a, 0.0, 1.0);
}

float rand(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    float scaledTime = uTime * uTimeScale;
    float noise = snoise(vec2(vUv.x * uScale + sin(scaledTime), vUv.y * uScale + cos(scaledTime)));
    vec3 outputColor = mix(uColor2, uColor1, clamp(noise * 0.5 + 0.5, 0.0, 1.0));
    float noise2 = snoise(vec2(vUv.x * uScale3 + sin(scaledTime), vUv.y * uScale3 + cos(scaledTime)));

    // Vignette / Soft circular falloff
    float circle = length(vUv - 0.5) * 0.9;
    float border = smoothstep(uScaleVignette - uVignetteBorderFade, uScaleVignette, 1.0 - circle);

    // Dynamic morphing blob / eclipse cut-out
    vec2 newPos = uBlackPosition;
    float scaledBlobTime = uTime * uBlackTimeScale;
    float blob1 = distance(vUv, newPos);
    float blob0 = distance(vUv, newPos + sin(scaledBlobTime) * 0.5);
    float blobGroup = smoothstep(uBlackRadius - uBlackBorderFade, uBlackRadius, blob1 * blob0);
    blobGroup *= uBlackAlpha;

    // Organic film grain
    outputColor += (rand(vUv) - 0.5) * 0.055;
    outputColor = saturate(outputColor);

    float alpha = (1.0 - (uColor3.x * noise2 * 0.45)) * (border * blobGroup) * uAlpha;
    gl_FragColor = vec4(outputColor, clamp(alpha, 0.0, 1.0));
}
`;

export default function VosButton({ onClick, isLight, text = "INVEST NOW", className = "" }) {
  const containerRef = useRef(null);
  const mountRef = useRef(null);
  const isHoveredRef = useRef(false);
  const mousePosRef = useRef({ x: 0.85, y: 0.85 });
  const targetPosRef = useRef({ x: 0.85, y: 0.85 });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let animId = null;
    let isActive = true;
    let renderer = null;
    let geometry = null;
    let material = null;
    let resizeObserver = null;
    const clock = new THREE.Clock();

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setClearColor(0x000000, 0);

      renderer.domElement.style.position = "absolute";
      renderer.domElement.style.inset = "0";
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.display = "block";
      renderer.domElement.style.borderRadius = "50%";
      renderer.domElement.style.pointerEvents = "none";
      mount.appendChild(renderer.domElement);

      const color1 = new THREE.Color(isLight ? "#00c8f8" : "#00e1ff");
      const color2 = new THREE.Color(isLight ? "#f97316" : "#ff7a00");
      const color3 = new THREE.Color(isLight ? "#0284c7" : "#259aa2");

      const uniforms = {
        uTime: { value: 0 },
        uBlackPosition: { value: new THREE.Vector2(0.85, 0.85) },
        uBlackRadius: { value: 0.44 },
        uBlackBorderFade: { value: 0.398 },
        uBlackTimeScale: { value: 0.778 },
        uBlackAlpha: { value: 1.0 },
        uColor1: { value: color1 },
        uColor2: { value: color2 },
        uColor3: { value: color3 },
        uTimeScale: { value: 0.22 },
        uScale: { value: 0.59 },
        uScale3: { value: 1.08 },
        uScaleVignette: { value: 0.746 },
        uVignetteBorderFade: { value: 0.216 },
        uAlpha: { value: 1.0 },
      };

      geometry = new THREE.PlaneGeometry(2, 2);
      material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        transparent: true,
        depthWrite: false,
        depthTest: false,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const handleResize = () => {
        if (!isActive || !mount || !renderer) return;
        const width = mount.clientWidth || 240;
        const height = mount.clientHeight || 240;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        renderer.setSize(width, height, false);
        renderer.setPixelRatio(dpr);
      };

      handleResize();

      resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      resizeObserver.observe(mount);

      const animate = () => {
        if (!isActive) return;
        const elapsedTime = clock.getElapsedTime();

        // If not hovered, smoothly orbit in a slow ambient celestial ellipse
        if (!isHoveredRef.current) {
          targetPosRef.current.x = 0.5 + Math.cos(elapsedTime * 0.7) * 0.32;
          targetPosRef.current.y = 0.5 + Math.sin(elapsedTime * 0.7) * 0.32;
        }

        // Smooth liquid dampening / lerp
        mousePosRef.current.x += (targetPosRef.current.x - mousePosRef.current.x) * 0.08;
        mousePosRef.current.y += (targetPosRef.current.y - mousePosRef.current.y) * 0.08;

        uniforms.uBlackPosition.value.set(mousePosRef.current.x, mousePosRef.current.y);
        uniforms.uTime.value = elapsedTime;

        // Subtle breath on hover
        const targetVignette = isHoveredRef.current ? 0.78 : 0.746;
        uniforms.uScaleVignette.value += (targetVignette - uniforms.uScaleVignette.value) * 0.1;

        renderer.render(scene, camera);
        animId = requestAnimationFrame(animate);
      };

      animId = requestAnimationFrame(animate);
    } catch (e) {
      console.warn("WebGL not supported for VosButton, using CSS glow fallback", e);
    }

    return () => {
      isActive = false;
      if (animId) cancelAnimationFrame(animId);
      if (resizeObserver) resizeObserver.disconnect();
      if (renderer && mount && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      if (geometry) geometry.dispose();
      if (material) material.dispose();
      if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss();
      }
    };
  }, [isLight]);

  const handlePointerMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1.0 - (e.clientY - rect.top) / rect.height;
    targetPosRef.current = {
      x: Math.max(0.05, Math.min(0.95, x)),
      y: Math.max(0.05, Math.min(0.95, y)),
    };
  };

  const handlePointerEnter = (e) => {
    isHoveredRef.current = true;
    handlePointerMove(e);
  };

  const handlePointerLeave = () => {
    isHoveredRef.current = false;
  };

  return (
    <button
      ref={containerRef}
      type="button"
      className={`vos-btn-wrapper ${className}`}
      onClick={onClick}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      aria-label={text}
    >
      {/* VOS9X Organic Glow Backdrop */}
      <div className="vos-btn-glow" />
      {/* VOS9X Interactive WebGL Shader Canvas */}
      <div ref={mountRef} className="vos-btn-canvas" />
      {/* Centered Typography */}
      <div className="btn-text">
        <span>{text}</span>
      </div>
    </button>
  );
}
