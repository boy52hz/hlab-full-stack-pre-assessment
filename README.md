# H LAB Full Stack Pre-Assessment

## React Questions

### 1. `useCallback` ใช้ทำอะไร

เป็น React Hook ที่ใช้สำหรับ cache function ที่สร้างเก็บไว้ใน memory โดย function ที่ถูกสร้างขึ้นภายใน `useCallback` จะไม่ถูกสร้างใหม่ทุกครั้งเมื่อ component มีการ re-render แต่จะถูกสร้างใหม่ก็ต่อเมื่อ **dependency array** มีการเปลี่ยนแปลง
โดยค่า return จาก `useCallback` จะเป็น function ที่ถูก cache ไว้

### 2. Write a unit test for the `UserProfile` React component using Jest and React Testing Library

**src/components/UserProfile.js** [(view source)](./react/task2/src/components/UserProfile.js)

```jsx
import React, { useState, useEffect } from 'react'
const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.example.com/users/${userId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch user data')
        }
        const userData = await response.json()
        setUser(userData)
      } catch (err) {
        setError(err.message)
      }
    }
    fetchData()
  }, [userId])
  if (error) {
    return <div>Error: {error}</div>
  }
  if (!user) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  )
}
export default UserProfile
```

**src/components/UserProfile.test.js** [(view source)](./react/task2/src/components/UserProfile.test.js)

```jsx
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
```

## Candidate Information

- Name: Tharadon Saenmart
- Email: tharadon.saenmart@gmail.com
