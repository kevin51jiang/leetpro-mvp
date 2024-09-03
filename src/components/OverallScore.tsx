import { Paper, Text, Title } from "@mantine/core";

interface OverallScoreProps {
  score?: number;
}

export function OverallScore({ score }: OverallScoreProps) {
  return (
    <Paper shadow="sm" p="md" mb="md">
      <Title order={2}>Overall Score</Title>
      <Text size="xl" fw={700}>
        {score !== undefined ? `${score}/100` : "N/A"}
      </Text>
    </Paper>
  );
}
