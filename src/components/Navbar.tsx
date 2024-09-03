import { Box, Flex, Text, Image } from "@mantine/core";

interface NavbarProps {
  meetingTopic: string;
}

export function Navbar({ meetingTopic }: NavbarProps) {
  return (
    <Box component="nav" py="xs" px="xl" style={{ backgroundColor: "#f0f0f0" }}>
      <Flex justify="space-between" align="center">
        <a href="/">
          <Image src="icon.svg" alt="Logo" width={24} height={24} />
        </a>
        <Text size="md" fw={600}>
          {meetingTopic}
        </Text>
        <Box w={40} />
      </Flex>
    </Box>
  );
}
