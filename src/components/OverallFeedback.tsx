import { Paper, Title } from "@mantine/core";
import Markdown from "react-markdown";

interface OverallFeedbackProps {
  feedback?: string;
}

export function OverallFeedback({ feedback }: OverallFeedbackProps) {
  return (
    <Paper shadow="sm" p="md" mb="md">
      <Title order={2}>Overall Feedback</Title>
      <Markdown>{feedback || "No feedback available."}</Markdown>
    </Paper>
  );
}
