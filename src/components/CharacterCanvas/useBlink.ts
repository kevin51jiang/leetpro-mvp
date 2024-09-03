import { VRM, VRMExpressionPresetName } from "@pixiv/three-vrm";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useAudioStore } from "../../stores/audioStore";

interface BlinkManagerProps {
  vrm: VRM | null;
  closeTime?: number;
  openTime?: number;
  continuity?: number;
  randomness?: number;
}

export const useBlink = ({
  vrm,
  closeTime = 0.5,
  openTime = 0.5,
  continuity = 1,
  randomness = 3
}: BlinkManagerProps) => {
  const modeRef = useRef<'ready' | 'closing' | 'open'>('ready');
  const eyeOpenRef = useRef(1);
  const blinkCounterRef = useRef(0);

  useFrame((_, deltaTime) => {
    if (!vrm) return;

    const isSpeaking = useAudioStore.getState().currentlyPlayingUrl !== null;
    let effectiveCloseTime = closeTime;
    let effectiveOpenTime = openTime;
    let effectiveContinuity = continuity;
    let effectiveRandomness = randomness;

    if (isSpeaking) {
      effectiveCloseTime = 0.1;
      effectiveOpenTime = 0.1;
      effectiveContinuity = 1;
      effectiveRandomness = 5;
    }


    switch (modeRef.current) {
      case 'closing':
        if (eyeOpenRef.current > 0) {
          eyeOpenRef.current -= deltaTime / effectiveCloseTime;
        } else {
          eyeOpenRef.current = 0;
          modeRef.current = 'open';
        }
        break;
      case 'open':
        if (eyeOpenRef.current < 1) {
          eyeOpenRef.current += deltaTime / effectiveOpenTime;
        } else {
          eyeOpenRef.current = 1;
          modeRef.current = 'ready';
        }
        break;
      case 'ready':
        blinkCounterRef.current += deltaTime;
        if (blinkCounterRef.current >= effectiveContinuity) {
          if (Math.floor(Math.random() * effectiveRandomness) === 0) {
            modeRef.current = 'closing';
          }
          blinkCounterRef.current = 0;
        }
        break;
    }

    vrm.expressionManager?.setValue(VRMExpressionPresetName.Blink, 1 - eyeOpenRef.current);
    vrm.expressionManager?.update();
  });

  return null;
};