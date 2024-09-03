import React from "react";
import { Paper, Text } from "@mantine/core";
import Markdown from "react-markdown";

interface MessageBubbleProps {
  content: string;
  isUser: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  content,
  isUser,
}) => (
  <Paper
    mx="lg"
    mt="sm"
    mb="xs"
    p="md"
    radius="lg"
    style={{
      backgroundColor: isUser ? "#007AFF" : "#E5E5EA",
      color: isUser ? "white" : "black",
      alignSelf: isUser ? "flex-end" : "flex-start",
      maxWidth: "70%",
    }}
  >
    <Text size="sm">
      <Markdown>{content}</Markdown>
    </Text>
  </Paper>
);
