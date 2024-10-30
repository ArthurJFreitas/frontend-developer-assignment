import { useState } from 'react';

import recipientsDataJson from './../assets/recipientsData.json';

import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  Input,
  VStack,
} from '@chakra-ui/react';

import { Users, Mail, Search } from 'lucide-react';

import RecipientList from '../components/RecipientList';
import { useDebounce } from '../hooks/useDebounce';
import { RecipientsData, useRecipients } from '../hooks/useRecipients';
import { EmptyData } from './EmptyData';

const recipientsData = recipientsDataJson as RecipientsData;

const EmailManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const {
    expandedDomains,
    toggleDomain,
    filteredGroups,
    selectedGroups,
    addRecipient,
    addDomain,
    removeRecipient,
    removeDomain,
  } = useRecipients(debouncedSearchTerm, recipientsData);

  return (
    <Container maxW="6xl" py={8}>
      <Box bg="white" rounded="lg" shadow="lg" p={6}>
        <Heading size="lg" mb={6}>
          Email Recipients Manager
        </Heading>

        <Flex gap={4} mb={6}>
          <Box position="relative" flex="1">
            <Input
              data-testid="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              pl="2.5rem"
              width={['100%', '100%', '30%']}
            />
            <Icon
              color="gray.400"
              position="absolute"
              left="0.75rem"
              top="50%"
              transform="translateY(-50%)"
            >
              <Search />
            </Icon>
          </Box>
        </Flex>
        
        <Flex gap={6} direction={['column', 'column', 'row']}>
          <Box flex={1}>
            <Flex align="center" mb={4}>
              <Icon mr={2}>
                <Users />
              </Icon>
              <Heading size="md">Available Recipients</Heading>
            </Flex>
            <VStack gap={3} align="stretch">
              {filteredGroups.length === 0 ? (
                <EmptyData />
              ) : (
                filteredGroups.map((item) => (
                  <RecipientList
                    key={'domain' in item ? item.domain : item.email}
                    item={item}
                    isSelected={false}
                    expandedDomains={expandedDomains}
                    toggleDomain={toggleDomain}
                    onAddRecipient={addRecipient}
                    onRemoveRecipient={removeRecipient}
                    onAddDomain={addDomain}
                    onRemoveDomain={removeDomain}
                  />
                ))
              )}
            </VStack>
          </Box>
          <Box flex={1}>
            <Flex align="center" mb={4}>
              <Icon mr={2}>
                <Mail />
              </Icon>
              <Heading size="md">Selected Recipients</Heading>
            </Flex>
            <VStack gap={3} align="stretch">
              {selectedGroups.length === 0 ? (
                <EmptyData />
              ) : (
                selectedGroups.map((item) => (
                  <RecipientList
                    key={'domain' in item ? item.domain : item.email}
                    item={item}
                    isSelected={true}
                    expandedDomains={expandedDomains}
                    toggleDomain={toggleDomain}
                    onAddRecipient={addRecipient}
                    onRemoveRecipient={removeRecipient}
                    onAddDomain={addDomain}
                    onRemoveDomain={removeDomain}
                  />
                ))
              )}
            </VStack>
          </Box>
        </Flex>
      </Box>
    </Container>
  );
};

export default EmailManager;
