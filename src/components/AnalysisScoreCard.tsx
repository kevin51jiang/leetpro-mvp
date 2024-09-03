import { Paper, Text, Title, Progress } from "@mantine/core";
import Markdown from "react-markdown";
import { AnalysisScore } from "../types/chat";

interface AnalysisScoreCardProps {
  analysisScore: AnalysisScore;
}

export function AnalysisScoreCard({ analysisScore }: AnalysisScoreCardProps) {
  return (
    <Paper shadow="sm" p="md" mb="md">
      <Title order={3}>{analysisScore.human_name}</Title>
      <Progress value={analysisScore.score} mb="xs" />
      <Text size="sm" mb="xs">{analysisScore.score}/100</Text>
      <Markdown>{analysisScore.feedback}</Markdown>
    </Paper>
  );
}
