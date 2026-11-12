import React, { Suspense, useEffect, useMemo } from 'react';
import { Billboard, Line, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import type { MissionWorldProps } from '../../types/expedition';
import { getFourStepGradientMap } from '../../utils/celShading';

// The decoder is shipped with the demo so neither model needs a third-party CDN.
const DECODER_PATH = '/vendor/draco/';

function seeded(seed: number) {
  return () => {
    seed = Math.imul(1664525, seed) + 1013904223;
    return (seed >>> 0) / 4294967296;
  };
}

function Strut({ from, to, radius = 0.035, color = '#b9b6a8' }: {
  from: [number, number, number]; to: [number, number, number]; radius?: number; color?: string;
}) {
  const { middle, quaternion, length } = useMemo(() => {
    const a = new THREE.Vector3(...from);
    const b = new THREE.Vector3(...to);
    const direction = b.clone().sub(a);
    return {
      middle: a.add(b).multiplyScalar(0.5),
      length: direction.length(),
      quaternion: new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize()),
    };
  }, [from[0], from[1], from[2], to[0], to[1], to[2]]);
  return <mesh position={middle} quaternion={quaternion} castShadow>
    <cylinderGeometry args={[radius, radius, length, 6]} />
    <meshToonMaterial color={color} gradientMap={getFourStepGradientMap()} />
  </mesh>;
}

function Surface({ moon }: { moon: boolean }) {
  const details = useMemo(() => {
    const random = seeded(moon ? 67 : 2012);
    return Array.from({ length: 125 }, (_, i) => {
      const angle = random() * Math.PI * 2;
      const distance = 5 + random() * 68;
      const x = Math.cos(angle) * distance;
      const z = Math.sin(angle) * distance;
      return { x, z, scale: 0.1 + random() * (i % 9 === 0 ? 1.2 : 0.45), rotation: random() * 4 };
    }).filter(({ x, z }) => Math.hypot(x - 12, z + 9) > 3 && Math.hypot(x + 11, z + 10) > 3 && Math.hypot(x - 10, z + 7) > 2);
  }, [moon]);
  const hills = useMemo(() => {
    const random = seeded(moon ? 1203 : 8102);
    return Array.from({ length: 28 }, (_, i) => ({
      angle: (i / 28) * Math.PI * 2,
      distance: 75 + random() * 25,
      height: 7 + random() * 18,
      radius: 10 + random() * 15,
    }));
  }, [moon]);
  return <group>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, 0]} receiveShadow>
      <circleGeometry args={[180, 96]} />
      <meshToonMaterial color={moon ? '#aaa89d' : '#b8734f'} gradientMap={getFourStepGradientMap()} />
    </mesh>
    {details.map((rock, i) => <mesh key={i} position={[rock.x, rock.scale * 0.27, rock.z]} rotation={[0.25, rock.rotation, 0.1]} scale={[rock.scale, rock.scale * 0.7, rock.scale * 1.1]} castShadow receiveShadow>
      <dodecahedronGeometry args={[1, 0]} />
      <meshToonMaterial color={moon ? (i % 3 ? '#85857c' : '#c5c0ad') : (i % 3 ? '#89533c' : '#d49a6e')} gradientMap={getFourStepGradientMap()} />
    </mesh>)}
    {hills.map((hill, i) => <mesh key={i} position={[Math.cos(hill.angle) * hill.distance, -3, Math.sin(hill.angle) * hill.distance]} scale={[hill.radius, hill.height, hill.radius]}>
      <icosahedronGeometry args={[1, 1]} />
      <meshToonMaterial color={moon ? '#686c6c' : '#aa6649'} gradientMap={getFourStepGradientMap()} />
    </mesh>)}
    {moon ? <mesh position={[-14, 0.005, -18]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[5.4, 6.3, 44]} /><meshToonMaterial color="#96958a" />
    </mesh> : null}
  </group>;
}

function StarField() {
  const geometry = useMemo(() => {
    const random = seeded(1972);
    const vertices: number[] = [];
    for (let i = 0; i < 850; i++) {
      const azimuth = random() * Math.PI * 2;
      const polar = Math.acos(2 * random() - 1);
      vertices.push(120 * Math.sin(polar) * Math.cos(azimuth), 120 * Math.cos(polar), 120 * Math.sin(polar) * Math.sin(azimuth));
    }
    const result = new THREE.BufferGeometry();
    result.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    return result;
  }, []);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return <points geometry={geometry}><pointsMaterial color="#e1dcca" size={0.12} sizeAttenuation transparent opacity={0.7} depthWrite={false} /></points>;
}

class ModelFallback extends React.Component<{ children: React.ReactNode; fallback: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

function NormalizedModel({ path, span, grounded = true }: { path: string; span: number; grounded?: boolean }) {
  const { scene } = useGLTF(path, DECODER_PATH);
  const model = useMemo(() => {
    const clone = scene.clone(true);
    clone.updateMatrixWorld(true);
    clone.traverse((node) => {
      if (!(node instanceof THREE.Mesh)) return;
      if (!node.geometry?.attributes.position?.count) { node.visible = false; return; }
      const convert = (original: THREE.Material) => {
        const source = original as THREE.MeshStandardMaterial;
        return new THREE.MeshToonMaterial({
          color: source.color ? source.color.clone() : new THREE.Color('#d8d4c6'),
          map: source.map ?? null,
          gradientMap: getFourStepGradientMap(),
          transparent: source.transparent,
          opacity: source.opacity,
          side: source.side,
          alphaTest: source.alphaTest,
        });
      };
      node.material = Array.isArray(node.material) ? node.material.map(convert) : convert(node.material);
      node.castShadow = true;
      node.receiveShadow = true;
    });
    const bounds = new THREE.Box3().setFromObject(clone);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    const scale = span / Math.max(size.x, size.y, size.z, 0.001);
    const container = new THREE.Group();
    container.add(clone);
    clone.position.sub(center);
    if (grounded) clone.position.y += size.y / 2;
    container.scale.setScalar(scale);
    return container;
  }, [scene, span, grounded]);
  useEffect(() => () => {
    model.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        const materials = Array.isArray(node.material) ? node.material : [node.material];
        materials.forEach((material) => material.dispose());
      }
    });
  }, [model]);
  return <primitive object={model} dispose={null} />;
}

function Surveyor() {
  const legs = [0, (Math.PI * 2) / 3, (Math.PI * 4) / 3];
  return <group>
    <mesh position={[0, 1.05, 0]} castShadow><cylinderGeometry args={[0.54, 0.64, 0.4, 3]} /><meshToonMaterial color="#dfdbc8" gradientMap={getFourStepGradientMap()} /></mesh>
    <mesh position={[0, 0.68, 0]} castShadow><coneGeometry args={[0.25, 0.48, 10]} /><meshToonMaterial color="#4b5152" /></mesh>
    {legs.map((angle, i) => {
      const x = Math.cos(angle) * 1.65;
      const z = Math.sin(angle) * 1.65;
      return <group key={i}>
        <Strut from={[Math.cos(angle) * 0.4, 1.15, Math.sin(angle) * 0.4]} to={[x, 0.12, z]} radius={0.055} />
        <Strut from={[0, 0.75, 0]} to={[x, 0.12, z]} radius={0.027} />
        <mesh position={[x, 0.06, z]} receiveShadow><cylinderGeometry args={[0.32, 0.24, 0.1, 10]} /><meshToonMaterial color="#bcb8a2" gradientMap={getFourStepGradientMap()} /></mesh>
      </group>;
    })}
    <Strut from={[0, 1.1, 0]} to={[0.15, 2.8, -0.1]} radius={0.055} />
    <mesh position={[0.14, 2.55, -0.09]} rotation={[0.28, -0.35, 0]} castShadow><boxGeometry args={[1.05, 0.055, 0.62]} /><meshToonMaterial color="#273b4c" gradientMap={getFourStepGradientMap()} /></mesh>
    <Strut from={[-0.35, 0.9, 0.15]} to={[-1.4, 0.3, 0.9]} radius={0.045} />
    {/* The recovered scoop and camera are intentionally absent in the future scene. */}
    <mesh position={[-0.18, 1.7, 0.24]} castShadow><boxGeometry args={[0.2, 0.12, 0.16]} /><meshToonMaterial color="#7f827a" /></mesh>
    <mesh position={[0.3, 1.25, 0.15]} castShadow><boxGeometry args={[0.34, 0.32, 0.34]} /><meshToonMaterial color="#bca274" gradientMap={getFourStepGradientMap()} /></mesh>
  </group>;
}

function DescentStage() {
  return <group position={[12, 0, -9]} rotation={[0, 0.3, 0]}>
    <mesh position={[0, 1, 0]} castShadow><cylinderGeometry args={[1.3, 1.3, 1.35, 8]} /><meshToonMaterial color="#b79b5c" gradientMap={getFourStepGradientMap()} /></mesh>
    <mesh position={[0, 1.71, 0]}><cylinderGeometry args={[0.95, 1.13, 0.08, 8]} /><meshToonMaterial color="#777973" /></mesh>
    {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle, i) => <group key={i}>
      <Strut from={[Math.cos(angle) * 1.1, 1.3, Math.sin(angle) * 1.1]} to={[Math.cos(angle) * 2.5, 0.12, Math.sin(angle) * 2.5]} radius={0.065} color="#ddd0a4" />
      <mesh position={[Math.cos(angle) * 2.5, 0.06, Math.sin(angle) * 2.5]}><cylinderGeometry args={[0.4, 0.4, 0.08, 12]} /><meshToonMaterial color="#9a9a8b" /></mesh>
    </group>)}
  </group>;
}

function CuriositySchematic() {
  return <group>
    <mesh position={[0, 1, 0]} castShadow><boxGeometry args={[1.5, 0.5, 2]} /><meshToonMaterial color="#e0dbca" gradientMap={getFourStepGradientMap()} /></mesh>
    {[-1, 1].flatMap((side) => [-0.8, 0, 0.8].map((z, i) => <group key={`${side}-${i}`}>
      <mesh position={[side, 0.35, z]} rotation={[0, 0, Math.PI / 2]} castShadow><cylinderGeometry args={[0.35, 0.35, 0.25, 16]} /><meshToonMaterial color="#454842" /></mesh>
      <Strut from={[side * 0.6, 0.9, 0]} to={[side, 0.35, z]} />
    </group>))}
    <Strut from={[-0.35, 1.25, -0.3]} to={[-0.35, 2.15, -0.3]} radius={0.08} />
    <mesh position={[-0.35, 2.15, -0.3]}><boxGeometry args={[0.55, 0.28, 0.25]} /><meshToonMaterial color="#d5d0bf" /></mesh>
    <mesh position={[-0.35, 2.16, -0.15]}><boxGeometry args={[0.45, 0.13, 0.02]} /><meshToonMaterial color="#283c42" /></mesh>
  </group>;
}

function MarsArtifacts() {
  return <group>
    {/* An isolated schematic heat-shield exhibit links to the actual landing map. */}
    <group position={[-11, 0.13, -10]} rotation={[0.12, 0.3, 0.08]}>
      <mesh castShadow receiveShadow><cylinderGeometry args={[1.7, 1.5, 0.19, 24]} /><meshToonMaterial color="#5d4639" gradientMap={getFourStepGradientMap()} /></mesh>
      <mesh position={[0, 0.11, 0]}><cylinderGeometry args={[1.25, 1.6, 0.13, 24]} /><meshToonMaterial color="#a77953" gradientMap={getFourStepGradientMap()} /></mesh>
    </group>
    <group position={[10, 0, -7]}>
      <mesh position={[0, 0.13, 0]} scale={[1.6, 0.18, 1.05]} rotation={[0, 0.3, 0]} receiveShadow><dodecahedronGeometry args={[1.2, 0]} /><meshToonMaterial color="#b8a087" gradientMap={getFourStepGradientMap()} /></mesh>
      <mesh position={[0.18, 0.35, 0.05]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[0.06, 12]} /><meshBasicMaterial color="#3c3028" /></mesh>
    </group>
    {/* Parallel geometric trail is an illustrative HUD overlay, not recorded wheel tracks. */}
    {[-0.65, 0.65].map((x) => <Line key={x} points={[[x, 0.018, 3], [x + 0.6, 0.018, 5], [x + 2, 0.018, 7], [x + 4.4, 0.018, 9]]} color="#e5bb80" lineWidth={1} transparent opacity={0.4} dashed dashSize={0.18} gapSize={0.2} />)}
  </group>;
}

function PioneerSchematic() {
  return <group>
    <mesh position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[1.35, 0.35, 0.38, 40, 1, true]} /><meshToonMaterial color="#dfdccb" side={THREE.DoubleSide} gradientMap={getFourStepGradientMap()} /></mesh>
    <mesh position={[0, 0.2, -0.4]}><cylinderGeometry args={[0.45, 0.45, 0.7, 6]} /><meshToonMaterial color="#b28b4f" gradientMap={getFourStepGradientMap()} /></mesh>
    <Strut from={[0, 0.4, 0]} to={[-4, 0, 0]} color="#bdc2b8" />
    <Strut from={[0, 0.4, 0]} to={[3, 1.7, -1]} color="#bdc2b8" />
    <Strut from={[0, 0.4, 0]} to={[0, 4, -1.1]} color="#bdc2b8" />
    {[-3.5, -4].map((x) => <mesh key={x} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.17, 0.17, 0.55, 12]} /><meshToonMaterial color="#545851" /></mesh>)}
    <mesh position={[0, -0.4, 0.65]}><boxGeometry args={[0.4, 0.26, 0.02]} /><meshToonMaterial color="#c9ab6d" /></mesh>
  </group>;
}

function DiscoveryMarker({ position, selected, discovered, accent, onClick }: {
  position: [number, number, number]; selected: boolean; discovered: boolean; accent: string; onClick: () => void;
}) {
  const color = selected ? '#fff3d4' : discovered ? '#86bfb4' : accent;
  return <group position={[position[0], position[1] + 0.65, position[2]]} onClick={(event) => { event.stopPropagation(); onClick(); }}>
    <Billboard>
      <mesh><ringGeometry args={[selected ? 0.17 : 0.11, selected ? 0.2 : 0.14, 28]} /><meshBasicMaterial color={color} depthTest={false} transparent opacity={0.95} /></mesh>
      <mesh><circleGeometry args={[0.055, 16]} /><meshBasicMaterial color={color} depthTest={false} /></mesh>
      <mesh visible={false}><circleGeometry args={[0.45, 16]} /><meshBasicMaterial /></mesh>
    </Billboard>
    <mesh position={[0, -0.25, 0]}><cylinderGeometry args={[0.008, 0.008, 0.3, 5]} /><meshBasicMaterial color={color} transparent opacity={0.55} /></mesh>
  </group>;
}

export function MissionWorld({ mission, selectedId, discoveredIds, onSelect }: MissionWorldProps) {
  const space = mission.id === 'pioneer';
  const moon = mission.id === 'surveyor';
  return <>
    <color attach="background" args={[space ? '#090f1b' : moon ? '#111820' : '#c69273']} />
    {!space ? <fog attach="fog" args={[moon ? '#283138' : '#c69273', 42, 150]} /> : null}
    <ambientLight intensity={space ? 1.1 : 0.7} color={space ? '#b7c8df' : '#fff0d6'} />
    <hemisphereLight args={[moon ? '#cdd8de' : '#f5d9b0', moon ? '#4f5557' : '#69402d', 1.15]} />
    <directionalLight position={[-12, 16, 8]} intensity={space ? 2.5 : 3} color="#fff4dd" castShadow shadow-mapSize={[1024, 1024]} shadow-camera-left={-25} shadow-camera-right={25} shadow-camera-top={25} shadow-camera-bottom={-25} shadow-bias={-0.001} />
    {space || moon ? <StarField /> : null}
    {!space ? <Surface moon={moon} /> : null}
    {moon ? <><Surveyor /><DescentStage /></> : null}
    {mission.id === 'curiosity' ? <>
      <ModelFallback fallback={<CuriositySchematic />}><Suspense fallback={<CuriositySchematic />}><NormalizedModel path="/models/curiosity.glb" span={3.3} /></Suspense></ModelFallback>
      <MarsArtifacts />
    </> : null}
    {space ? <ModelFallback fallback={<PioneerSchematic />}><Suspense fallback={<PioneerSchematic />}><NormalizedModel path="/models/pioneer.glb" span={8} grounded={false} /></Suspense></ModelFallback> : null}
    {mission.discoveries.map((discovery) => <DiscoveryMarker key={discovery.id} position={discovery.position} selected={selectedId === discovery.id} discovered={discoveredIds.includes(discovery.id)} accent={mission.accent} onClick={() => onSelect(discovery.id)} />)}
  </>;
}
