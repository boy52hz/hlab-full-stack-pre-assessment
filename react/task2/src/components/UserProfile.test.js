import { describe, it, beforeEach, afterEach, jest } from '@jest/globals'
import { render, screen, waitFor } from '@testing-library/react'
import UserProfile from './UserProfile'

describe('UserProfile', () => {
  const mockupData = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@gmail.com'
  }

  beforeEach(() => {
    jest.spyOn(global, 'fetch')
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should render user data when successfully fetched user data', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockupData
    })
    render(<UserProfile userId={1} />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1))
    expect(await screen.findByText(mockupData.name)).toBeInTheDocument()
    expect(
      await screen.findByText(`Email: ${mockupData.email}`)
    ).toBeInTheDocument()
  })

  it('should render error message when failed to fetch user data', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false
    })
    render(<UserProfile userId={1} />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1))
    expect(await screen.findByText(/Error/i)).toBeInTheDocument()
  })
})
