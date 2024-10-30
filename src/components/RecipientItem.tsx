import React from 'react';
import { Box, Text, Flex, Button, Icon } from '@chakra-ui/react';
import { X, Plus } from 'lucide-react';

interface Recipient {
  email: string;
  name?: string;
}

interface RecipientItemProps {
  recipient: Recipient;
  isSelected: boolean;
  onAdd: (recipient: Recipient) => void;
  onRemove: (email: string) => void;
}

export function RecipientItem({
  recipient,
  isSelected,
  onAdd,
  onRemove,
}: RecipientItemProps){
  const handleAction = () => {
    isSelected ? onRemove(recipient.email) : onAdd(recipient);
  };

  return (
    <Flex
      justify="space-between"
      align="center"
      py={2}
      px={4}
      bg="white"
      borderRadius="md"
      boxShadow="sm"
    >
      <Box>
        <Text fontWeight="medium" fontSize="sm">
          {recipient.name}
        </Text>
        <Text fontSize="xs" color="gray.500">
          {recipient.email}
        </Text>
      </Box>
      <Button
        size="sm"
        variant="ghost"
        colorScheme={isSelected ? 'red' : 'blue'}
        onClick={handleAction}
        data-testid={`recipient-action-button-${recipient.email}`}
      >
        <Icon>{isSelected ? <X /> : <Plus />}</Icon>
      </Button>
    </Flex>
  );
};

export default React.memo(RecipientItem);
