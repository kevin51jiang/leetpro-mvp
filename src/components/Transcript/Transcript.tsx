import React from "react";
import { Box, Stack, ScrollArea } from "@mantine/core";
import { useChatStore } from "../../stores/chatStore";
import { useAudioStore } from "../../stores/audioStore";
import { useMicVAD } from "@ricky0123/vad-react";
import { Message } from "./Message";
import { AudioVisualizer } from "../AudioVisualizer";
import { transcribe } from "../../api";
import { WaveFile } from "wavefile";
import { useBottomBarStore } from "../../stores/bottomBarStore";

export const Transcript: React.FC = () => {
  const messages = useChatStore((state) => state.messages);
  const micStream = useAudioStore((state) => state.micStream);
  const isMicOn = useBottomBarStore((state) => state.isMicOn);

  // const [tempMessage, setTempMessage] = useState("");
  const addMessage = useChatStore((state) => state.addMessage);
  const bottomOfChatRef = useChatStore((state) => state.bottomOfChatRef);

  const vad = useMicVAD({
    stream: micStream,
    startOnLoad: true,
    // modelURL: "https://leetpro-poc-public.s3.amazonaws.com/silero_vad.onnx",
    onSpeechStart: () => {
      console.debug("vad", "on_speech_start");
      console.time("performance_speech");
    },
    onSpeechEnd: (audio: Float32Array) => {
      console.debug("vad", "on_speech_end");
      console.timeEnd("performance_speech");

      if (!isMicOn) {
        return;
      }

      console.time("performance_transcribe");
      console.debug("whisper_openai attempt");

      const wav = new WaveFile();
      wav.fromScratch(1, 16000, "32f", audio);
      const file = new File([wav.toBuffer()], "input.wav", {
        type: "audio/wav",
      });
      (async () => {
        try {
          const transcription = await transcribe(file);
          console.debug("whisper_openai success", transcription);
          addMessage("user", transcription);
        } catch (error) {
          console.error("whisper_openai error", error);
        } finally {
          console.timeEnd("performance_transcribe");
        }
      })();
    },
  });

  if (vad.errored) {
    console.error("vad error", vad.errored);
  }

  return (
    <ScrollArea
      mah={"90vh"}
      miw={"20rem"}
      maw={"30rem"}
      style={{ overflowY: "auto" }}
      h="100%"
      p="lg"
      bd="1px solid #e0e0e0"
      flex={1}
    >
      <Box>
        <Stack>
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
          {/* {tempMessage && <TempMessage content={tempMessage} />} */}

          <AudioVisualizer />
          <div ref={bottomOfChatRef} />
        </Stack>
      </Box>
    </ScrollArea>
  );
};
