import { useEffect, useState } from 'react';
import { AnimationMixer, AnimationAction } from 'three';
// import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { VRM } from '@pixiv/three-vrm';
import { ObjectMap, useFrame } from '@react-three/fiber';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { VRMAnimation } from '@pixiv/three-vrm-animation';

import * as THREE from 'three';



/**
* VRMアニメーションを読み込む
*
* https://github.com/vrm-c/vrm-specification/blob/master/specification/VRMC_vrm_animation-1.0/README.ja.md
*/
const loadAnimation = async (animation: VRMAnimation | THREE.AnimationClip, vrm: VRM, mixer: AnimationMixer): Promise<AnimationAction> => {
  if (vrm == null || mixer == null) {
    throw new Error("You have to load VRM first");
  }

  let clip: THREE.AnimationClip;
  if (animation instanceof THREE.AnimationClip) {
    clip = animation;
  } else {
    // @ts-expect-error
    clip = (animation as VRMAnimation).createAnimationClip(vrm);
  }
  mixer.stopAllAction()
    ? animation
    // @ts-expect-error
    : animation.createAnimationClip(vrm);
  mixer.stopAllAction()
  const action = mixer.clipAction(clip);
  action.play();

  return action;
}

export function useAnimation(animationGTLF: GLTF & ObjectMap, vrm: VRM) {
  const [action, setAction] = useState<AnimationAction | null>(null);
  const [mixer, setMixer] = useState<AnimationMixer | null>(null);


  useEffect(() => {
    const mixer = new AnimationMixer(vrm?.scene);
    setMixer(mixer);
  }, [vrm])


  useEffect(() => {
    if (!mixer || !vrm || !animationGTLF) return;
    (async () => {
      const action = await loadAnimation(animationGTLF.animations[0], vrm, mixer)
      setAction(action)
    })()
  }, [animationGTLF, vrm, mixer])

  useFrame((_, delta) => {
    mixer?.update(delta);
  });

  return {
    action,
    mixer
  }
}


//   const asdf = useLoader()

//   // const mixerRef = useRef<AnimationMixer | null>(null);
//   // const actionsRef = useRef<AnimationAction[]>([]);
//   // const [currentAnimationIndex, setCurrentAnimationIndex] = useState(0);
//   // const [lastAnimationIndex, setLastAnimationIndex] = useState(-1);
//   // const weightInRef = useRef(1);
//   // const weightOutRef = useRef(0);

//   // useEffect(() => {
//   //   if (!vrm) return;

//   //   let animationClips: AnimationClip[] = [];

//   //   const loadAndStartAnimation = async () => {
//   //     try {
//   //       const fbxData = await fbxLoader.loadAsync(animationUrl);
//   //       animationClips = fbxData.animations;

//   //       animationClips[0].tracks = animationClips[0].tracks.filter(track =>
//   //         track.name !== "neck.quaternion" && track.name !== "spine.quaternion"
//   //       );

//   //       mixerRef.current = new AnimationMixer(vrm.scene);
//   //       actionsRef.current = animationClips.map(clip => mixerRef.current!.clipAction(clip));

//   //       startAnimation();
//   //     } catch (error) {
//   //       console.error("Failed to load animation:", error);
//   //     }
//   //   };

//   //   const startAnimation = () => {
//   //     const currentAction = actionsRef.current[currentAnimationIndex];
//   //     currentAction.reset().play();
//   //     randomizeAnimation(animationClips[currentAnimationIndex].duration);
//   //   };

//   //   const randomizeAnimation = (yieldTime: number) => {
//   //     setTimeout(() => {
//   //       setLastAnimationIndex(currentAnimationIndex);
//   //       const newIndex = Math.floor(Math.random() * animationClips.length);
//   //       setCurrentAnimationIndex(newIndex);

//   //       if (newIndex !== currentAnimationIndex) {
//   //         weightInRef.current = 0;
//   //         weightOutRef.current = 1;

//   //         actionsRef.current[newIndex].play().reset();
//   //       }

//   //       randomizeAnimation(animationClips[newIndex].duration - interpolationTime);
//   //     }, yieldTime * 1000);
//   //   };

//   //   loadAndStartAnimation();

//   //   return () => {
//   //     mixerRef.current?.stopAllAction();
//   //   };
//   // }, [animationUrl, vrm]);

//   // useFrame((state, delta) => {
//   //   if (mixerRef.current) {
//   //     const currentAction = actionsRef.current[currentAnimationIndex];
//   //     const lastAction = actionsRef.current[lastAnimationIndex];

//   //     if (lastAction) {
//   //       lastAction.weight = weightOutRef.current;
//   //     }
//   //     if (currentAction) {
//   //       currentAction.weight = weightInRef.current;
//   //     }

//   //     mixerRef.current.update(delta);

//   //     if (weightInRef.current < 1) {
//   //       weightInRef.current += 1 / (30 * interpolationTime);
//   //     } else {
//   //       weightInRef.current = 1;
//   //     }

//   //     if (weightOutRef.current > 0) {
//   //       weightOutRef.current -= 1 / (30 * interpolationTime);
//   //     } else {
//   //       weightOutRef.current = 0;
//   //     }
//   //   }
//   // });

//   // return {
//   //   currentAnimationIndex,
//   //   lastAnimationIndex,
//   //   weightIn: weightInRef.current,
//   //   weightOut: weightOutRef.current
//   // };
// }