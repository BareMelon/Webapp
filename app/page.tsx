"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useCallback, memo } from "react";
import { Environment, Float, Html, PerspectiveCamera, ScrollControls, Text, useScroll } from "@react-three/drei";
import Link from "next/link";
import {
  AdditiveBlending,
  Color,
  DoubleSide,
  Group,
  InstancedMesh,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  ShaderMaterial,
  Vector3,
} from "three";
import styles from "./page.module.css";

const overlaySections = [
  { title: "Portal Wake", description: "Cinematic Discord handshakes that onboard squads in seconds." },
  { title: "Insight Stream", description: "Dashboards amplify drops, quest goals, and retention cohorts." },
  { title: "Automation Core", description: "Stripe, Roblox, and Discord pipelines firing in sync." },
  { title: "Command Deck", description: "Sponsor-grade status boards and moderation macros." },
  { title: "Launch Pad", description: "Concierge rollout plans, playbooks, and premium care." },
];

function HeroPortal({ position }: { position: [number, number, number] }) {
  const portalRef = useRef<Mesh>(null);
  const gradient = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          uColorA: { value: new Color("#5c6cfd") },
          uColorB: { value: new Color("#31c6ff") },
          uTime: { value: 0 },
        },
        vertexShader: `
          varying vec2 vUv;
          void main(){
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
          }
        `,
        fragmentShader: `
          varying vec2 vUv;
          uniform vec3 uColorA;
          uniform vec3 uColorB;
          uniform float uTime;
          void main(){
            float gradient = smoothstep(0.0,1.0,vUv.y + 0.1*sin(vUv.x*8.0 + uTime*1.7));
            vec3 color = mix(uColorA,uColorB,gradient);
            float alpha = smoothstep(0.0,0.1,vUv.y) * smoothstep(1.0,0.7,vUv.y);
            gl_FragColor = vec4(color, alpha*0.95);
          }
        `,
        transparent: true,
        side: DoubleSide,
      }),
    [],
  );

  useFrame((_, delta) => {
    gradient.uniforms.uTime.value += delta;
    if (portalRef.current) {
      portalRef.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <group position={position}>
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh ref={portalRef}>
          <ringGeometry args={[1.4, 1.85, 96]} />
          <meshStandardMaterial
            color="#5c6cfd"
            emissive="#5c6cfd"
            emissiveIntensity={1.1}
            roughness={0.2}
            metalness={0.45}
          />
        </mesh>
      </Float>
      <mesh position={[0, 0, -0.03]}>
        <planeGeometry args={[2.8, 3.6, 1, 1]} />
        <primitive object={gradient} attach="material" />
      </mesh>
    </group>
  );
}

function FloatingGlyph({ label, position }: { label: string; position: [number, number, number] }) {
  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={0.6}>
      <Text position={position} color="rgba(245,246,255,0.92)" fontSize={0.26} letterSpacing={0.2} anchorX="center" anchorY="middle">
        {label}
      </Text>
    </Float>
  );
}

function Particles() {
  const points = useMemo(() => {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = Math.random() * 18 - 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 16;
      sizes[i] = Math.random() * 0.5 + 0.2;
    }
    return { positions, sizes };
  }, []);

  const shader = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          uColor: { value: new Color("#8aa6ff") },
          uTime: { value: 0 },
        },
        vertexShader: `
          attribute float aSize;
          varying float vAlpha;
          uniform float uTime;
          void main(){
            vAlpha = sin((position.y + uTime * 1.2) * 0.4) * 0.4 + 0.6;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = aSize * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform vec3 uColor;
          varying float vAlpha;
          void main(){
            float d = length(gl_PointCoord - vec2(0.5));
            float alpha = smoothstep(0.5, 0.0, d) * vAlpha;
            gl_FragColor = vec4(uColor, alpha * 0.7);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending,
      }),
    [],
  );

  const pointsRef = useRef<Mesh>(null);
  useFrame((_, delta) => {
    shader.uniforms.uTime.value += delta;
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.035;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points.positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[points.sizes, 1]} />
      </bufferGeometry>
      <primitive object={shader} attach="material" />
    </points>
  );
}

function EnergyHalo({ radius = 4.2, inner = 1.8 }: { radius?: number; inner?: number }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.38, 0]}>
      <ringGeometry args={[inner, radius, 128]} />
      <meshBasicMaterial color="#5c6cfd" transparent opacity={0.28} />
    </mesh>
  );
}

function LightColumn({ position, height = 4.6 }: { position: [number, number, number]; height?: number }) {
  return (
    <group position={position}>
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[0.22, 0.22, height, 48, 1, true]} />
        <meshBasicMaterial color="#5c6cfd" transparent opacity={0.22} side={DoubleSide} />
      </mesh>
      <mesh position={[0, height, 0]}>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={0.9}
          roughness={0.28}
          metalness={0.3}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.32, 0.6, 64]} />
        <meshBasicMaterial color="#31c6ff" transparent opacity={0.55} />
      </mesh>
    </group>
  );
}

function DataCluster() {
  const meshRef = useRef<InstancedMesh>(null);
  const distribution = useMemo(() => {
    const palette = ["#5c6cfd", "#31c6ff", "#a855f7", "#8b5cf6"];
    const object = new Object3D();
    return Array.from({ length: 42 }).map(() => {
      const position = new Vector3((Math.random() - 0.5) * 3.2, Math.random() * 2.8, (Math.random() - 0.5) * 2.4);
      const scaleY = 0.6 + Math.random() * 1.6;
      const rotation = new Vector3(Math.random() * 0.2, Math.random() * Math.PI * 2, Math.random() * 0.2);
      object.position.copy(position);
      object.rotation.set(rotation.x, rotation.y, rotation.z);
      object.scale.set(0.38, scaleY, 0.38);
      object.updateMatrix();
      return { matrix: object.matrix.clone(), color: palette[Math.floor(Math.random() * palette.length)] };
    });
  }, []);

  useLayoutEffect(() => {
    if (!meshRef.current) return;
    distribution.forEach((entry, index) => {
      meshRef.current!.setMatrixAt(index, entry.matrix);
      meshRef.current!.setColorAt(index, new Color(entry.color));
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [distribution]);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, distribution.length]}>
      <boxGeometry args={[0.24, 1, 0.24]} />
      <meshStandardMaterial vertexColors metalness={0.35} roughness={0.3} />
    </instancedMesh>
  );
}

function ScrollRig({ onProgressChange }: { onProgressChange: (value: number) => void }) {
  const contentRef = useRef<Group>(null);
  const glowRef = useRef<Mesh>(null);
  const scroll = useScroll();
  const smoothProgress = useRef(0);
  const journeyDepth = 14.5;
  const onProgressRef = useRef(onProgressChange);

  useEffect(() => {
    onProgressRef.current = onProgressChange;
  }, [onProgressChange]);

  useFrame((state, delta) => {
    smoothProgress.current += (scroll.offset - smoothProgress.current) * Math.min(1, delta * 5);
    const depth = smoothProgress.current * journeyDepth;
    const lateral = Math.sin(smoothProgress.current * Math.PI * 2) * 2.1;

    state.camera.position.lerp(new Vector3(lateral, 1.4 - smoothProgress.current * 1.3, 6 - smoothProgress.current * 3.4), delta * 2.2);
    state.camera.lookAt(0, 0.4 - smoothProgress.current * 1.6, 0);

    if (contentRef.current) {
      contentRef.current.position.y = -depth;
    }

    if (glowRef.current) {
      const material = glowRef.current.material as MeshBasicMaterial;
      glowRef.current.position.y = -depth - 2.2;
      glowRef.current.scale.setScalar(1 + smoothProgress.current * 0.9);
      material.opacity = 0.45 + smoothProgress.current * 0.4;
    }

    onProgressRef.current(Math.min(Math.max(smoothProgress.current, 0), 1));
  });

  return (
    <group>
      <group ref={contentRef} position={[0, 0, 0]}>
        <group position={[0, 0, 0]}>
          <HeroPortal position={[0, 0.4, 0]} />
          <EnergyHalo />
          <FloatingGlyph label="DISCORD" position={[-1.8, 1.4, -0.3]} />
          <FloatingGlyph label="SHOP" position={[1.9, 1.9, 0.1]} />
          <FloatingGlyph label="QUESTS" position={[-1.3, -0.8, 0.3]} />
          <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.4}>
            <mesh position={[0, -1.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <circleGeometry args={[4.2, 72]} />
              <meshBasicMaterial color="#070b16" transparent opacity={0.82} />
            </mesh>
          </Float>
          <LightColumn position={[3.2, -1.4, -1.6]} height={5} />
          <LightColumn position={[-3.4, -1.4, 1.4]} height={4.4} />
        </group>

        <group position={[0, -3.4, 0]}>
          <Float speed={2.1} rotationIntensity={0.5} floatIntensity={0.8}>
            <mesh>
              <torusKnotGeometry args={[1.2, 0.22, 200, 32]} />
              <meshStandardMaterial
                color="#a855f7"
                emissive="#a855f7"
                emissiveIntensity={0.7}
                metalness={0.4}
                roughness={0.2} 
              />
            </mesh>
          </Float>
          <Html center position={[0, -1.2, 0]} transform distanceFactor={6}>
            <div className={styles.glassCard}>
              <span className={styles.eyebrow}>Realtime Metrics</span>
              <h2>Dynamic admin insight stream</h2>
              <p>Monitor drops, players, and Discord automation with cinematic clarity.</p>
              <Link href="https://github.com/BareMelon" className={styles.chip}>
                Visit our Github
            </Link>
          </div>
          </Html>
        </group>

        <group position={[0, -7, 0]}>
          <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
            <mesh position={[0, 0.4, 0]}>
              <icosahedronGeometry args={[1.6, 0]} />
              <meshStandardMaterial
                color="#5c6cfd"
                emissive="#5c6cfd"
                emissiveIntensity={1.25}
                roughness={0.1}
                metalness={0.32}
              />
            </mesh>
          </Float>
          <Html center position={[0, -1.6, 0]} transform distanceFactor={6}>
            <div className={styles.glassCard}>
              <span className={styles.eyebrow}>Launch-ready</span>
              <h2>Full pipeline orchestration</h2>
              <p>Stripe-powered shop, quest tracking, and Discord role sync integrated as one.</p>
              <Link href="mailto:hello@stellarforge.gg" className={styles.cta}>
                Book a call
              </Link>
            </div>
          </Html>
        </group>

        <group position={[0, -10.4, 0]}>
          <DataCluster />
          <LightColumn position={[2.6, 0, -1.8]} height={5.4} />
          <LightColumn position={[-2.8, 0, 1.6]} height={4.8} />
          <Html center position={[0, -1.3, 0]} transform distanceFactor={6}>
            <div className={`${styles.glassCard} ${styles.deepCard}`}>
              <span className={styles.eyebrow}>Automation Core</span>
              <h2>Workflow galaxy</h2>
              <p>Pre-built Discord events, monetized perks, and quest triggers you can shape live.</p>
              <div className={styles.statGrid}>
                <div className={styles.stat}>
                  <strong>+240%</strong>
                  <span>engagement</span>
                </div>
                <div className={styles.stat}>
                  <strong>12x</strong>
                  <span>automation</span>
                </div>
                <div className={styles.stat}>
                  <strong>99.8%</strong>
                  <span>uptime</span>
                </div>
              </div>
            </div>
          </Html>
        </group>

        <group position={[0, -13.8, 0]}>
          <EnergyHalo radius={5.2} inner={2.4} />
          <LightColumn position={[3.4, -1.4, 0]} height={6.2} />
          <LightColumn position={[-3.4, -1.4, 0]} height={6.2} />
          <Html center position={[0, -1.8, 0]} transform distanceFactor={6}>
            <div className={styles.finalCard}>
              <span className={styles.tag}>Launch Pad</span>
              <h2 className={styles.finalTitle}>From pitch to live event in 14 days</h2>
              <p className={styles.finalSubtitle}>We package creative direction, quest scripting, monetization flows, and Discord bots into one concierge rollout.</p>
              <div className={styles.finalButtons}>
                <Link href="mailto:hello@stellarforge.gg" className={styles.primaryButton}>
                  Schedule blueprint
                  </Link>
                <Link href="https://github.com/BareMelon" className={styles.secondaryButton}>
                  Download deck
                </Link>
              </div>
          </div>
          </Html>
        </group>
      </group>

      <Float speed={2.4} rotationIntensity={0.3} floatIntensity={0.2}>
        <mesh ref={glowRef} position={[0, -4.5, -1]}>
          <planeGeometry args={[9, 12]} />
          <meshBasicMaterial color="#111831" transparent opacity={0.4} />
        </mesh>
      </Float>
    </group>
  );
}

const OverlayLayer = memo(function OverlayLayer({
  registerHandler,
}: {
  registerHandler: (handler?: (value: number) => void) => void;
}) {
  const progressTrackRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLLIElement | null)[]>([]);
  const activeIndexRef = useRef(0);

  const handleProgress = useCallback((value: number) => {
    const clamped = Math.min(Math.max(value, 0), 0.9999);
    if (progressTrackRef.current) {
      progressTrackRef.current.style.setProperty("--progress", clamped.toString());
    }
    const nextIndex = Math.min(overlaySections.length - 1, Math.floor(clamped * overlaySections.length));
    if (nextIndex !== activeIndexRef.current) {
      sectionRefs.current.forEach((node, index) => {
        if (!node) return;
        node.classList.toggle(styles.sectionItemActive, index === nextIndex);
      });
      activeIndexRef.current = nextIndex;
    }
  }, []);

  useEffect(() => {
    registerHandler(handleProgress);
    return () => registerHandler(undefined);
  }, [handleProgress, registerHandler]);

  return (
    <div className={styles.overlay} data-overlay>
      <nav className={styles.topbar}>
        <span>StellarForge</span>
        <div className={styles.links}>
          <a href="#">Home</a>
          <a href="#">Features</a>
          <a href="#">Roadmap</a>
          <a href="#">Contact</a>
          </div>
        <a className={styles.cta} href="https://discord.com/oauth2/authorize" target="_blank" rel="noreferrer">
          Join Discord
        </a>
      </nav>

      <div className={styles.body}>
        <section className={styles.hero}>
          <span className={styles.pill}>Immersive Control Hub</span>
          <h1 className={styles.heroTitle}>Command your Roblox universe in 3D</h1>
          <p className={styles.heroSubtitle}>
            Guide sponsors, staff, and players through a cinematic pipeline that syncs Discord, Roblox, and monetization flows in real time.
          </p>
          <div className={styles.heroActions}>
            <Link href="mailto:hello@stellarforge.gg" className={styles.primaryCta}>
              Book studio call
                </Link>
            <Link href="https://github.com/BareMelon" className={styles.secondaryCta}>
              Watch product demo
            </Link>
          </div>
        </section>

        <aside className={styles.panel}>
          <div className={styles.progress}>
            <span>Experience progress</span>
            <div className={styles.progressTrack} ref={progressTrackRef}>
              <div className={styles.progressBar} />
            </div>
          </div>
          <ul className={styles.sectionList}>
            {overlaySections.map((item, index) => (
              <li
                key={item.title}
                ref={(node) => {
                  sectionRefs.current[index] = node;
                }}
                className={`${styles.sectionItem} ${index === 0 ? styles.sectionItemActive : ""}`}
              >
                <span>{item.title}</span>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </aside>
          </div>

      <footer className={styles.bottombar}>
        <span>© {new Date().getFullYear()} StellarForge · Immersive Roblox control hubs.</span>
        <span>Premium build · $2000 tier</span>
      </footer>
    </div>
  );
});

function Scene({ onProgressChange }: { onProgressChange: (value: number) => void }) {
  return (
    <Suspense fallback={null}>
      <color attach="background" args={["#03060d"]} />
      <fog attach="fog" args={["#03060d", 10, 32]} />
      <PerspectiveCamera makeDefault position={[0, 1.6, 6]} fov={40} near={0.2} far={80} />
      <ambientLight intensity={0.45} />
      <spotLight
        position={[6, 10, 6]}
        angle={0.8}
        penumbra={0.4}
        intensity={1.5}
        color={new Color("#a855f7")}
        castShadow
      />
      <spotLight position={[-6, 4, 8]} angle={0.9} penumbra={0.6} intensity={1.1} color={new Color("#31c6ff")} />
      <Environment preset="night" />
      <Particles />
      <ScrollRig onProgressChange={onProgressChange} />
    </Suspense>
  );
}

export default function Page() {
  const overlayHandlerRef = useRef<(value: number) => void>();
  const registerOverlayHandler = useCallback((handler?: (value: number) => void) => {
    overlayHandlerRef.current = handler;
  }, []);
  const handleProgressChange = useCallback((value: number) => {
    overlayHandlerRef.current?.(value);
  }, []);
  return (
    <main className={styles.viewport}>
      <Canvas shadows gl={{ antialias: true }}>
        <ScrollControls damping={0.18} pages={4.6}>
          <Scene onProgressChange={handleProgressChange} />
        </ScrollControls>
      </Canvas>
      <OverlayLayer registerHandler={registerOverlayHandler} />
    </main>
  );
}


