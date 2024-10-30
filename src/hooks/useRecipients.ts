import { useState, useMemo, useCallback } from 'react';

export interface Recipient {
  email: string;
  name?: string;
  isSelected?: boolean;
}

export interface GroupedRecipients {
  [domain: string]: Recipient[];
}

export type RecipientGroupItem = Recipient | { domain: string; recipients: Recipient[] };

export type RecipientsData = Recipient[];

export const useRecipients = (searchTerm: string, recipientsData: RecipientsData) => {
  const initialSelectedRecipients = useMemo(
    () => recipientsData.filter((r) => r.isSelected),
    [recipientsData]
  );

  const initialAvailableRecipients = useMemo(
    () => recipientsData.filter((r) => !r.isSelected),
    [recipientsData]
  );

  const [selectedRecipients, setSelectedRecipients] = useState<Recipient[]>(
    initialSelectedRecipients
  );

  const [availableRecipients, setAvailableRecipients] = useState<Recipient[]>(
    initialAvailableRecipients
  );

  const groupedAvailable = useMemo(
    () => groupRecipientsByDomain(availableRecipients),
    [availableRecipients]
  );

  const groupedSelected = useMemo(
    () => groupRecipientsByDomain(selectedRecipients),
    [selectedRecipients]
  );

  const [expandedDomains, setExpandedDomains] = useState<Set<string>>(
    new Set(Object.keys(groupedAvailable))
  );

  const filteredGroups = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    return filterGroups(groupedAvailable, searchLower);
  }, [groupedAvailable, searchTerm]);

  const selectedGroups = useMemo(() => {
    return mapGroups(groupedSelected);
  }, [groupedSelected]);

  const toggleDomain = useCallback((domain: string) => {
    setExpandedDomains((prev) => {
      const next = new Set(prev);
      next.has(domain) ? next.delete(domain) : next.add(domain);
      return next;
    });
  }, []);

  const addRecipient = useCallback((recipient: Recipient) => {
    setSelectedRecipients((prev) => [...prev, recipient]);
    setAvailableRecipients((prev) => prev.filter((r) => r.email !== recipient.email));
  }, []);

  const addDomain = useCallback((domain: string, recipients: Recipient[]) => {
    setSelectedRecipients((prev) => [...prev, ...recipients]);
    setAvailableRecipients((prev) =>
      prev.filter((r) => !r.email.endsWith(`@${domain}`))
    );
  }, []);

  const removeRecipient = useCallback(
    (email: string) => {
      setSelectedRecipients((prev) => prev.filter((r) => r.email !== email));
      const recipient = recipientsData.find((r) => r.email === email);
      if (recipient) {
        setAvailableRecipients((prev) => {
          return prev.some((r) => r.email === recipient.email) ? prev : [...prev, recipient];
        });
      }
    },
    [recipientsData]
  );

  const removeDomain = useCallback(
    (domain: string) => {
      setSelectedRecipients((prev) => prev.filter((r) => !r.email.endsWith(`@${domain}`)));
      const domainRecipients = recipientsData.filter((r) => r.email.endsWith(`@${domain}`));
      setAvailableRecipients((prev) => {
        const newAvailableRecipients = domainRecipients.filter(
          (domainRecipient) => !prev.some((r) => r.email === domainRecipient.email)
        );
        return [...prev, ...newAvailableRecipients];
      });
    },
    [recipientsData]
  );
 
  return {
    expandedDomains,
    toggleDomain,
    filteredGroups,
    selectedGroups,
    addRecipient,
    addDomain,
    removeRecipient,
    removeDomain,
  };
};

const mapGroups = (groups: GroupedRecipients): RecipientGroupItem[] => {
  let result: RecipientGroupItem[] = [];

  for (const [domain, recipients] of Object.entries(groups)) {
    if (recipients.length === 1) {
      result.push(recipients[0]);
    } else {
      result.push({ domain, recipients });
    }
  }

  return result;
};

const groupRecipientsByDomain = (recipients: Recipient[]): GroupedRecipients => {
  return recipients.reduce((acc: GroupedRecipients, recipient) => {
    const domain = recipient.email.split('@')[1];
    if (!acc[domain]) acc[domain] = [];
    acc[domain].push(recipient);
    return acc;
  }, {});
};

const filterGroups = (
  groups: GroupedRecipients,
  searchTerm: string
): RecipientGroupItem[] => {
  let result: RecipientGroupItem[] = [];

  for (const [domain, recipients] of Object.entries(groups)) {
    const matchingRecipients = recipients.filter(
      (r) =>
        r.name?.toLowerCase().includes(searchTerm) ||
        r.email.toLowerCase().includes(searchTerm) ||
        domain.toLowerCase().includes(searchTerm)
    );

    if (matchingRecipients.length === 0) continue;

    if (matchingRecipients.length === 1) {
      result.push(matchingRecipients[0]);
    } else {
      result.push({ domain, recipients: matchingRecipients });
    }
  }

  return result;
};
