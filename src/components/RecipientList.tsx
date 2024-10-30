import React from 'react';
import { Box, Flex, Button, Text, VStack, Icon } from '@chakra-ui/react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import RecipientItem from './RecipientItem';
import { Recipient, RecipientGroupItem } from '../hooks/useRecipients';

interface RecipientListProps {
  item: RecipientGroupItem;
  isSelected: boolean;
  expandedDomains: Set<string>;
  toggleDomain: (domain: string) => void;
  onAddRecipient: (recipient: Recipient) => void;
  onRemoveRecipient: (email: string) => void;
  onAddDomain: (domain: string, recipients: Recipient[]) => void;
  onRemoveDomain: (domain: string) => void;
}

export function RecipientList({
  item,
  isSelected,
  expandedDomains,
  toggleDomain,
  onAddRecipient,
  onRemoveRecipient,
  onAddDomain,
  onRemoveDomain,
}: RecipientListProps) {
  if ('domain' in item) {
    const { domain, recipients } = item;
    const isExpanded = expandedDomains.has(domain);

    const handleDomainAction = () => {
      isSelected ? onRemoveDomain(domain) : onAddDomain(domain, recipients);
    };

    return (
      <Box bg="white" rounded="md" shadow="sm" p={4}>
        <Flex justify="space-between" align="center">
          <Button variant="ghost" size="sm" onClick={() => toggleDomain(domain)}>
            <Box display="flex" alignItems="center">
              <Icon>{isExpanded ? <ChevronUp /> : <ChevronDown />}</Icon>
              <Text fontWeight="medium" ml={2}>
                @{domain}
              </Text>
              <Text ml={2} color="gray.500" fontSize="sm">
                ({recipients.length})
              </Text>
            </Box>
          </Button>
          <Button
            size="sm"
            variant="ghost"
            colorScheme={isSelected ? 'red' : 'blue'}
            onClick={handleDomainAction}
          >
            {isSelected ? (
              <Icon>
                <X />
              </Icon>
            ) : (
              'Add all'
            )}
          </Button>
        </Flex>

        {isExpanded && (
          <VStack mt={2} pl={6} align="stretch" gap={1}>
            {recipients.map((recipient) => (
              <RecipientItem
                key={recipient.email}
                recipient={recipient}
                isSelected={isSelected}
                onAdd={onAddRecipient}
                onRemove={onRemoveRecipient}
              />
            ))}
          </VStack>
        )}
      </Box>
    );
  } else {
    const recipient = item as Recipient;
    return (
      <RecipientItem
        key={recipient.email}
        recipient={recipient}
        isSelected={isSelected}
        onAdd={onAddRecipient}
        onRemove={onRemoveRecipient}
      />
    );
  }
};

export default React.memo(RecipientList);
