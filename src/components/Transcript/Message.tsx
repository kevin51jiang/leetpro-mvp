import React from "react";
import { Box, Text, Avatar } from "@mantine/core";
import { MessageBubble } from "./MessageBubble";
import { Message as ChatMessage } from "../../types/chat";

interface MessageProps {
  message: ChatMessage;
}

export const Message: React.FC<MessageProps> = ({ message }) => {
  const getAvatarProps = () => {
    switch (message.role) {
      case "system":
        return { color: "gray", children: "Sys" };
      case "assistant":
        return {
          src: "/interviewer-avatar.png",
          color: "gray",
          children: "Tanya",
        };
      case "user":
        return { src: "/user-avatar.png", color: "blue" };
      default:
        return { color: "gray" };
    }
  };

  if (message.role === 'system') {
    return null;
  }

  return (
    <Box style={{ display: "flex", flexDirection: "column" }}>
      {message.role === "user" ? (
        <>
          <MessageBubble
            content={message.content}
            isUser={message.role === "user"}
          />
          <Box style={{ display: "flex", flexDirection: "row-reverse" }}>
            <Avatar size="sm" radius="xl" mr="xs" {...getAvatarProps()} />
            <Text
              size="xs"
              c="dimmed"
              mt={4}
              style={{
                textAlign: message.role === "user" ? "right" : "left",
              }}
            >
              {message.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </Box>
        </>
      ) : (
        <>
          <MessageBubble content={message.content} isUser={false} />
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Avatar size="sm" radius="xl" mr="xs" {...getAvatarProps()} />
            <Text
              size="xs"
              c="dimmed"
              mt={4}
              style={{
                textAlign: "left",
              }}
            >
              {message.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </Box>
        </>
      )}
    </Box>
  );
};
