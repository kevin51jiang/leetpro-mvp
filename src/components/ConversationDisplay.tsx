import { Paper, Text, Title } from "@mantine/core";
import { Conversation, Message } from "../types/chat";

interface ConversationDisplayProps {
  conversation: Conversation;
}

export function ConversationDisplay({
  conversation,
}: ConversationDisplayProps) {
  return (
    <Paper shadow="sm" p="md">
      <Title order={2} mb="md">
        Transcript
      </Title>
      {conversation.messages
        .filter((message: Message) => message.role !== "system")
        .map((message: Message) => (
          <Text key={message.id} mb="xs">
            <strong>{message.role}:</strong> {message.content}
          </Text>
        ))}
    </Paper>
  );
}
