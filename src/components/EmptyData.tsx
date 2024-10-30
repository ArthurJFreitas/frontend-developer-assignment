import { Box, Flex, Text } from '@chakra-ui/react';

export function EmptyData({ text = 'No data' }: { text?: string }) {
  return (
    <Flex
      justify="center"
      align="center"
      py={2}
      px={4}
      bg="white"
      borderRadius="md"
      boxShadow="sm"
    >
      <Box>
        <Text fontSize="xl">
          {text}
        </Text>
      </Box>
    </Flex>
  );
}