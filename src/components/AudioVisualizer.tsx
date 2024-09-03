import { useRef, useCallback, useEffect } from "react";
import { useAudioStore } from "../stores/audioStore";

interface AudioVisualizerProps
  extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
  // stream: MediaStream | null;
}

export function AudioVisualizer({ ...props }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { micStream } = useAudioStore();

  const visualize = useCallback((stream: MediaStream) => {
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    source.connect(analyser);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasCtx = canvas.getContext("2d");
    if (!canvasCtx) return;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const drawVisual = () => {
      requestAnimationFrame(drawVisual);
      analyser.getByteTimeDomainData(dataArray);

      canvasCtx.fillStyle = "rgb(255, 255, 255)";
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = "rgb(0, 0, 0)";
      canvasCtx.beginPath();

      const sliceWidth = (canvas.width * 1.0) / bufferLength;

      let x = 0;
      for (let i = 0; i < bufferLength; ++i) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.lineTo(canvas.width, canvas.height / 2);
      canvasCtx.stroke();
    };

    drawVisual();
  }, []);

  useEffect(() => {
    if (micStream) {
      visualize(micStream);
    }
  }, [visualize, micStream]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const newWidth = parent.clientWidth - 20;
        canvas.width = newWidth;
        canvas.height = Math.floor(newWidth / 6);
      }
    };

    resizeCanvas();

    const observer = new ResizeObserver(resizeCanvas);
    if (canvas.parentElement) {
      observer.observe(canvas.parentElement);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // width={360} height={120}
  return <canvas {...props} ref={canvasRef}></canvas>;
}
