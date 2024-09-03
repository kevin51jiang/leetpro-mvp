import { useGLTF } from "@react-three/drei";
import { PrimitiveProps } from "@react-three/fiber";

interface ModelProps extends Omit<PrimitiveProps, "object"> {
  url: string;
}

export const Model = ({ url, ...props }: ModelProps) => {
  const { scene } = useGLTF(url);
  return <primitive {...props} object={scene} />;
};
