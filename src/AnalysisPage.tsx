import { useEffect, useState } from "react";
import {
  Container,
  Title,
  Text,
  Loader,
  Grid,
  Group,
  Image,
  Paper,
  Box,
} from "@mantine/core";
import { useParams } from "wouter";
import { Config } from "./Config";
import { ConversationOverallAnalysis } from "./types/chat";
import { OverallScore } from "./components/OverallScore";
import { AnalysisScoreCard } from "./components/AnalysisScoreCard";
import { OverallFeedback } from "./components/OverallFeedback";
import { ConversationDisplay } from "./components/ConversationDisplay";
import { TableOfContents } from "./components/TableOfContents";

export function AnalysisPage() {
  const params = useParams();

  const [fullOverallAnalysis, setFullOverallAnalysis] =
    useState<ConversationOverallAnalysis>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Attempt to fetch the analysis from the backend
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetch(`${Config.API_URL}/analysis/${params.conversationId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch analysis");
        }
        return response.json();
      })
      .then((data: ConversationOverallAnalysis) => setFullOverallAnalysis(data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [params.conversationId]);

  if (!params.conversationId) {
    return (
      <Container size="xl">
        <Text>No conversation id provided</Text>
      </Container>
    );
  }

  return (
    <Box h="100vh" w="100vw">
      <Container size="xl" h="100vh">
        <Paper shadow="sm" p="md" mb="xl">
          <Group align="center">
            <a href="https://tryleetpro.com" target="_blank">
              <Image src="/icon.svg" alt="Logo" width={50} height={50} />
            </a>
            <Title order={1}>Analysis Results</Title>
          </Group>
        </Paper>
        {isLoading ? (
          <Box ta="center" py="xl">
            <Loader size="xl" />
            <Text mt="md" fz="lg">
              Please wait... we're crunching through all of the data.
            </Text>
          </Box>
        ) : error ? (
          <Paper shadow="sm" p="md">
            <Text c="red" fz="lg">
              {error}
            </Text>
          </Paper>
        ) : fullOverallAnalysis ? (
          <Grid gutter="xl">
            <Grid.Col span={2}>
              <Paper shadow="sm" p="md" style={{ position: 'sticky', top: '2rem' }}>
                <TableOfContents analysis={fullOverallAnalysis.analysis} />
              </Paper>
            </Grid.Col>
            <Grid.Col span={6}>
              <OverallScore score={fullOverallAnalysis.overall_score} />

              <OverallFeedback
                feedback={fullOverallAnalysis.overall_feedback}
              />
              <Grid>
                {Object.entries(fullOverallAnalysis.analysis || {}).map(
                  ([key, value]) => (
                    <Grid.Col key={key} span={6}>
                      <div id={`section--${value.name}`}>
                        <AnalysisScoreCard analysisScore={value} />
                      </div>
                    </Grid.Col>
                  )
                )}
              </Grid>
            </Grid.Col>
            <Grid.Col span={4}>
              <ConversationDisplay
                conversation={fullOverallAnalysis.conversation}
              />
            </Grid.Col>
          </Grid>
        ) : null}
      </Container>
    </Box>
  );
}
