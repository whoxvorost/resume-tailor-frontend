import { useState } from 'react'
import { login, register } from '../api/resumeApi'

interface Props {
  onLogin: (token: string) => void
}

export default function LoginPage({ onLogin }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    try {
      if (isRegister) {
        await register(email, password)
      }
      const data = await login(email, password)
      onLogin(data.access_token)
    } catch (e) {
      setError('Invalid email or password')
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: 20 }}>
      <h1>Resume Tailor</h1>
      <h2>{isRegister ? 'Register' : 'Login'}</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 10 }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 10 }}
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button onClick={handleSubmit} style={{ width: '100%', padding: 10 }}>
        {isRegister ? 'Register' : 'Login'}
      </button>

      <p onClick={() => setIsRegister(!isRegister)} style={{ cursor: 'pointer', color: 'blue' }}>
        {isRegister ? 'Already have account? Login' : 'No account? Register'}
      </p>
    </div>
  )
}