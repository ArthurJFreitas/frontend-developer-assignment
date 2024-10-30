import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import '@testing-library/jest-dom'
import EmailManager from '../../components/EmailManager'

jest.mock('@chakra-ui/react');

test('search input filters recipients', async () => {
  render(<EmailManager />)
  const searchInput = screen.getByTestId('search')

  fireEvent.change(searchInput, {
    target: { value: 'james' },
  })

  await waitForElementToBeRemoved(() => screen.queryByText('jane@awesome.com'));

  expect(await screen.findByText('james@qwerty.com')).toBeInTheDocument()
})

test('clearing search input shows all recipients', async () => {
  render(<EmailManager />)
  const searchInput = screen.getByTestId('search')

  fireEvent.change(searchInput, {
    target: { value: 'james' },
  })

  expect(await screen.findByText('james@qwerty.com')).toBeInTheDocument()

  fireEvent.change(searchInput, { target: { value: '' } })

  expect(await screen.findByText('mike@hello.com')).toBeInTheDocument()
})

test('shows no results message for nonexistent recipient', async () => {
  render(<EmailManager />)
  const searchInput = screen.getByTestId('search')

  fireEvent.change(searchInput, {
    target: { value: 'nonexistent' },
  })

  await waitFor(async () => {
    expect(await screen.findByText('No data')).toBeInTheDocument()
  })
})