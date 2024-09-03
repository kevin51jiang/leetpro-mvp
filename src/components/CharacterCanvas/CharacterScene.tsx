import { useThree } from "@react-three/fiber";
import { Grid } from "@react-three/drei";
import { Speaker } from "./Speaker";
import { Room } from "./Room";
import { useEffect } from "react";

export const CharacterScene = () => {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 1.4, -0.5);
    camera.lookAt(0, 1, 1.3);
  }, [camera]);

  return (
    <>
      <ambientLight intensity={Math.PI / 8} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      {/* <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} /> */}
      <Grid args={[5, 5]} />
      <axesHelper />
      {/* <Office scale={6} rotation={[0, 1.5 * Math.PI, 0]} position={[-1, 0, 0]} /> */}
      <Room
        scale={0.06}
        position={[-0.4, -0.1, -1.4]}
        rotation={[0, 1.5 * Math.PI - 0.4, 0]}
      />
      <Speaker />
      {/* <CameraControls camera={camera} makeDefault /> */}
    </>
  );
};
