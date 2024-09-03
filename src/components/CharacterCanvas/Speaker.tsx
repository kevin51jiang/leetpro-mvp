import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import { VRMLoaderPlugin, VRMUtils } from "@pixiv/three-vrm";
import { useEffect } from "react";
import { useLipSync } from "./useLipSync";
import { useAudioStore } from "../../stores/audioStore";
import { useBlink } from "./useBlink";
import { VRMAnimationLoaderPlugin } from "@pixiv/three-vrm-animation";
import { useAnimation } from "./useAnimation";

export const Speaker = (props: any) => {
  const [characterVRM, idleVRMA] = useLoader(
    GLTFLoader,
    ["/vrms/female0.vrm", "/animations/waiting-4DOXHN5U.vrma"],
    (loader) => {
      loader.crossOrigin = "anonymous";
      loader.register((parser) => {
        return new VRMLoaderPlugin(parser);
      });
      loader.register((parser) => {
        return new VRMAnimationLoaderPlugin(parser);
      });
    }
    // ,
    // (event) => {
    //   console.log(event);
    // }
  );

  useEffect(() => {
    // on character load
    if (characterVRM) {
      VRMUtils.removeUnnecessaryVertices(characterVRM.scene);
      // VRMUtils.rotateVRM0(characterVRM.userData.vrm);
    }
  }, [characterVRM]);

  useAnimation(idleVRMA, characterVRM.userData.vrm);

  useBlink({ vrm: characterVRM.userData.vrm });
  const startFromAudioFile = useLipSync(characterVRM.userData.vrm);

  const { currentlyPlayingUrl, setCurrentlyPlayingUrl } = useAudioStore();

  useEffect(() => {
    if (currentlyPlayingUrl) {
      fetch(currentlyPlayingUrl)
        .then((res) => res.arrayBuffer())
        .then((buffer) => {
          return startFromAudioFile(buffer);
        })
        .finally(() => {
          console.log("Setting to null");
          setCurrentlyPlayingUrl(null);
        });
    }
  }, [currentlyPlayingUrl]);

  return (
    <>
      <primitive object={characterVRM.scene} {...props} />
    </>
  );
};
