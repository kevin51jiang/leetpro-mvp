import { Canvas } from "@react-three/fiber";
import { CharacterScene } from "./CharacterScene";
import { Box } from "@mantine/core";
import { useState, useEffect } from "react";

export const CharacterCanvas = () => {
  const [maxWidth, setMaxWidth] = useState(0);

  useEffect(() => {
    const updateMaxWidth = () => {
      setMaxWidth(Math.max(window.innerWidth - 20 * 16, 0)); // 20rem * 16px/rem
    };

    window.addEventListener("resize", updateMaxWidth);
    updateMaxWidth(); // Initial call

    return () => window.removeEventListener("resize", updateMaxWidth);
  }, []);

  return (
    <Box w="100%" h="min(100%, 90vh)" display="flex">
      <Box
        w={`min(100%, ${maxWidth}px)`}
        h="90vh"
        // m="auto"
      >
        <Canvas>
          <CharacterScene />
        </Canvas>
      </Box>
    </Box>
  );
};
