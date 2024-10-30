import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import RecipientItem from '../../components/RecipientItem'

jest.mock('@chakra-ui/react');

jest.mock('lucide-react', () => ({
  X: () => <svg data-testid="icon-x"></svg>,
  Plus: () => <svg data-testid="icon-plus"></svg>,
}));

describe('RecipientItem Component', () => {
  const mockRecipient = {
    email: 'jane@awesome.com',
    name: 'Jane Doe',
  };

  test('renders recipient name and email correctly', () => {
    render(<RecipientItem onAdd={() => {}} onRemove={() => {}}  recipient={mockRecipient} isSelected />)

    expect(screen.getByText('Jane Doe')).toBeInTheDocument();

    expect(screen.getByText('jane@awesome.com')).toBeInTheDocument();
  });

  test('displays Plus icon when isSelected is false', () => {

    render(<RecipientItem onAdd={() => {}} onRemove={() => {}}  recipient={mockRecipient} isSelected={false} />)

    expect(screen.getByTestId('icon-plus')).toBeInTheDocument();

    expect(screen.queryByTestId('icon-x')).not.toBeInTheDocument();
  });

  test('displays X icon when isSelected is true', () => {
    render(<RecipientItem onAdd={() => {}} onRemove={() => {}}  recipient={mockRecipient} isSelected />)

    expect(screen.getByTestId('icon-x')).toBeInTheDocument();

    expect(screen.queryByTestId('icon-plus')).not.toBeInTheDocument();
  });

  test('calls onAdd when isSelected is false and button is clicked', async () => {
    const onAddMock = jest.fn();
    const onRemoveMock = jest.fn();

    render(<RecipientItem onAdd={onAddMock} onRemove={onRemoveMock}  recipient={mockRecipient} isSelected={false} />)

    const actionButton = screen.getByTestId(`recipient-action-button-${mockRecipient.email}`);
    expect(actionButton).toBeInTheDocument();

    fireEvent.click(actionButton);

    await waitFor(() => {
      expect(onAddMock).toHaveBeenCalledTimes(1);
    });
  });

});