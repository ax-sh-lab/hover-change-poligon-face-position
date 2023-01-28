import "./styles.scss";
import styled from "styled-components";
import React, { Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, OrbitControls, Plane, useTexture } from "@react-three/drei";
import { Mesh } from "three";
import * as THREE from "three";

const Wrapper = styled.div`
  height: 100vh;
`;
const MAX_CLICK_DISTANCE = 10;
const Scene = () => {
  const ref = React.useRef<Mesh>();
  const lineRef = React.useRef<Mesh>();

  // const soilBaseColor = textureLoader.load("./textures/soil/Rock_Moss_001_basecolor.jpg");
  // const soilNormalMap = textureLoader.load("./textures/soil/Rock_Moss_001_normal.jpg");
  // const soilHeightMap = textureLoader.load("./textures/soil/Rock_Moss_001_height.png");
  // const soilRoughness = textureLoader.load("./textures/soil/Rock_Moss_001_roughness.jpg");
  // const soilAmbientOcclusion = textureLoader.load("./textures/soil/Rock_Moss_001_ambientOcclusion.jpg");
  const texture = useTexture({
    map:
      "https://raw.githubusercontent.com/tamani-coding/threejs-buffergeometry-examples/main/src/textures/soil/Rock_Moss_001_basecolor.jpg",
    normalMap:
      "https://raw.githubusercontent.com/tamani-coding/threejs-buffergeometry-examples/main/src/textures/soil/Rock_Moss_001_normal.jpg",
    displacementMap:
      "https://raw.githubusercontent.com/tamani-coding/threejs-buffergeometry-examples/main/src/textures/soil/Rock_Moss_001_height.png",
    // displacementScale: 2,
    roughnessMap:
      "https://raw.githubusercontent.com/tamani-coding/threejs-buffergeometry-examples/main/src/textures/soil/Rock_Moss_001_roughness.jpg",
    // roughness: 0,
    aoMap:
      "https://raw.githubusercontent.com/tamani-coding/threejs-buffergeometry-examples/main/src/textures/soil/Rock_Moss_001_ambientOcclusion.jpg"
  });
  console.log(texture, "<<<>>");
  useFrame(() => {
    // const now = Date.now() / 300;
    // const { geometry, rotation } = ref.current as Mesh;
    // const { position } = geometry.attributes;
    // const count: number = position.count;
    // for (let i = 0; i < count; i++) {
    //   const x = position.getX(i);
    //   // SINE WAVE
    //   const xangle = x + now;
    //   const xsin = Math.sin(xangle);
    //   position.setZ(i, xsin);
    //   rotation.x += 0.0000005;
    // }
    // geometry.computeVertexNormals();
    // position.needsUpdate = true;
  });

  // const [vec] = React.useState(() => new THREE.Vector3());

  const onMouseMove = ({ distance, point, object, face, ...e }) => {
    const { position } = object.geometry.attributes;
    // const { a, b, c } = face;
    // console.log(a, b, c);
    // const i = a;
    // const n = position.getZ(i) - 1;
    // position.setZ(i, n);
    // console.log(distance, face);
    lineRef.current?.position.copy(point);
    // object.geometry.computeVertexNormals();
    // position.needsUpdate = true;
    // .setX(5);
  };
  const onPointerDown = ({ distance, point, object, face, ...e }) => {
    const { position } = object.geometry.attributes;
    const { a, b, c } = face;
    console.log(object.geometry.faces, face.color);

    console.log(a, b, c);
    [a, b, c].forEach((i) => {
      const n = position.getZ(i) + 0.1; //x(MAX_CLICK_DISTANCE - distance) / 2;
      position.setZ(i, n);
      console.log(distance, face);
    });
    // const i = a;

    lineRef.current?.position.copy(point);
    object.geometry.computeVertexNormals();
    position.needsUpdate = true;
  };
  const onPointerDow = ({ distance, point, object, ...e }) => {
    const { position } = object.geometry.attributes;

    for (let i = 0; i < position.count; i++) {
      if (distance < MAX_CLICK_DISTANCE) {
        const n = position.getZ(i) + 0.00001; // (MAX_CLICK_DISTANCE - distance) / 2;
        console.log(n, ":<<<<");
        position.setZ(i, n);
      }
    }
    object.geometry.computeVertexNormals();
    position.needsUpdate = true;
  };
  // const onPointerDo = ({ intersections, ray, ...e }) => {
  //   if (!intersections.length < 0) return;
  //   const intersection = intersections[0];
  //   const { object, point } = intersection;
  //   const { geometry } = object;
  //   const { position } = geometry.attributes;
  //   // distance
  //   // point: Vector3
  //   // object: Mesh
  //   // uv: Vector2
  //   // face: Object
  //   // faceIndex: 374
  //   // eventObject: Mesh

  //   console.log(ray, e, "><>");

  //   for (let i = 0; i < position.count; i++) {
  //     // console.log(position.getX(i));
  //     vec.setX(position.getX(i));
  //     vec.setY(position.getY(i));
  //     vec.setZ(position.getZ(i));
  //     const toWorld = object.localToWorld(vec);

  //     const distance = point.distanceTo(toWorld);

  //     if (distance < MAX_CLICK_DISTANCE) {
  //       const n = position.getZ(i) + 1; // (MAX_CLICK_DISTANCE - distance) / 2;
  //       console.log(n, ":<<<<");
  //       position.setZ(i, n);
  //     }
  //   }
  //   geometry.computeVertexNormals();
  //   position.needsUpdate = true;
  // };
  return (
    <group>
      <Line
        ref={lineRef}
        points={[new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 10, 0)]}
        color={"white"}
        lineWidth={1}
        // dashed={boolean("dashed", false)}
      />
      <Plane
        ref={ref}
        receiveShadow
        castShadow
        // rotation-x={-Math.PI / 2}
        rotation-x={-0.8}
        rotation-z={-30}
        // rotateX={.1}
        // args={[10, 10, 10, 10]}
        args={[20, 20, 200, 200]}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerDown}
        // onPointerMove={onMouseMove}
      >
        <meshNormalMaterial
          attach="material"
          //  roughness={0}
          //  metalness={0.9}
          //  color="#f00"
        />
        {/* <meshStandardMaterial
          attach="material"
          roughness={0}
          metalness={0.9}
          color="#f00"
          // {...texture}
        /> */}
        {/* <meshPhongMaterial color="hotpink" wireframe /> */}
        {/* {texture && <meshNormalMaterial attach="material" {...texture} />} */}
      </Plane>
    </group>
  );
};

export default function App() {
  return (
    <Wrapper>
      <Canvas>
        <ambientLight intensity={9} />
        <directionalLight intensity={9} />
        <pointLight args={[0, 0, -99]} />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </Wrapper>
  );
}
