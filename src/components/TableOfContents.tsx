import { Box, List, Text } from "@mantine/core";
import { ConversationOverallAnalysis } from "../types/chat";

interface TableOfContentsProps {
  analysis: ConversationOverallAnalysis["analysis"];
}

export function TableOfContents({ analysis }: TableOfContentsProps) {
  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box style={{ position: "sticky", top: "20px" }}>
      <Text fw={700} mb="xs">
        Table of Contents
      </Text>
      <List>
        {Object.entries(analysis || {}).map(([key, value]) => (
          <List.Item key={key}>
            <a
              href={`#section--${value.name}`}
              onClick={(e) => scrollToSection(e, `section--${value.name}`)}
            >
              {value.human_name}
            </a>
          </List.Item>
        ))}
      </List>
    </Box>
  );
}
