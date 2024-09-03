import React from "react";
import { Box, Text } from "@mantine/core";
import { MessageBubble } from "./MessageBubble";

interface TempMessageProps {
  content: string;
}

export const TempMessage: React.FC<TempMessageProps> = ({ content }) => (
  <Box
    style={{
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "flex-end",
    }}
  >
    <Box style={{ flex: 1 }}>
      <MessageBubble content={content} isUser={true} />
      <Text size="xs" c="dimmed" mt={4} style={{ textAlign: "right" }}>
        Typing...
      </Text>
    </Box>
  </Box>
);