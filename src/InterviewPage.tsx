import { Flex, Stack } from "@mantine/core";
import { Transcript } from "./components/Transcript/Transcript";
import { useAudioStore } from "./stores/audioStore";
import { CharacterCanvas } from "./components/CharacterCanvas/CharacterCanvas";
import { useEffect } from "react";
import { toast } from "sonner";
import { Navbar } from "./components/Navbar";
import { BottomBar } from "./components/BottomBar"; // Add this import

export const InterviewPage = () => {
  const setMicStream = useAudioStore((state) => state.setMicStream);

  useEffect(() => {
    //  Ensure we have mic permissions
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        console.log("mic stream", stream);
        setMicStream(stream);
      })
      .catch((err) => {
        console.error("Error getting mic stream", err);
        if (err.name === "NotAllowedError") {
          toast.error(
            "Microphone access denied. Please allow microphone access and try again."
          );
        } else {
          toast.error(
            "Error accessing microphone. Please check your device settings."
          );
        }
      });
  }, [setMicStream]);

  return (
    <Flex direction="column" h="100vh" w="100vw" justify="space-between">
      <Navbar meetingTopic="Video Interview" />
      {/* <Box m="lg" style={{ flex: 1, overflow: "auto" }}> */}
      <Flex justify="space-between" flex={1}>
        <Stack flex={1}>
          <CharacterCanvas />
          {/* <VideoFeed /> */}
          {/* <AudioVisualizer /> */}
        </Stack>
        <Transcript />
      </Flex>
      {/* </Box> */}
      <BottomBar />
    </Flex>
  );
};
