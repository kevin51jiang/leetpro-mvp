import { useEffect, useRef, useState } from "react";
import { Box, Button, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useAudioStore } from "../stores/audioStore";

interface VideoFeedProps {
  width?: number | string;
  height?: number | string;
}

export function VideoFeed({ width = "100%", height = "auto" }: VideoFeedProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isStreamReady, setIsStreamReady] = useState(false);
  const setAudioStream = useAudioStore((state) => state.setMicStream);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    async function setupStream() {
      try {
        console.log("Requesting media permissions...");
        if (!streamRef.current) {
          streamRef.current = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });
        }
        console.log("Permissions granted, stream obtained");

        if (videoRef.current && streamRef.current) {
          videoRef.current.srcObject = streamRef.current;
          console.log("Stream set to video element");

          videoRef.current.onloadedmetadata = () => {
            console.log("Video metadata loaded");
            videoRef.current
              ?.play()
              .then(() => {
                console.log("Video playing");
                setIsStreamReady(true);
              })
              .catch((e) => {
                console.error("Error playing video:", e);
                // Add this line to set isStreamReady even if there's an error
                setIsStreamReady(true);
              });
          };
        }

        setAudioStream(streamRef.current);
        setHasPermission(true);
      } catch (error) {
        console.error("Error accessing media devices:", error);
        setHasPermission(false);
      }
    }

    setupStream();

    return () => {
      // Don't stop the stream on cleanup, just remove it from the video element
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [setAudioStream]);

  if (hasPermission === null) {
    return <Text>Requesting camera and microphone permissions...</Text>;
  }

  if (hasPermission === false) {
    return (
      <Box>
        <Text>Camera and microphone access denied.</Text>
        <Button onClick={() => setHasPermission(null)}>Try Again</Button>
      </Box>
    );
  }

  return (
    <Box
      style={{
        width,
        height,
        maxWidth: "100%",
        maxHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          transform: isMobile ? "scaleX(-1)" : "none",
          // Remove the display condition
          display: isStreamReady ? "block" : "none",
        }}
      />
      {!isStreamReady && (
        <Text>
          Loading video stream...{" "}
          {hasPermission === true
            ? "Permission granted, but stream not ready yet"
            : "Waiting for permission"}
        </Text>
      )}
    </Box>
  );
}
