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
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      if (isRegister) {
        await register(email, password)
      }
      const data = await login(email, password)
      onLogin(data.access_token)
    } catch (e) {
      setError('Invalid email or password')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
      <div className="bg-[#1a1a2e] border border-[#2d2d4a] p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-1">Resume Tailor</h1>
          <p className="text-purple-400 text-sm">AI-powered resume optimization</p>
        </div>

        <h2 className="text-xl font-semibold text-white mb-6">
          {isRegister ? 'Create Account' : 'Welcome Back'}
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full bg-[#12121a] border border-[#2d2d4a] text-white px-4 py-3 rounded-lg mb-4 outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full bg-[#12121a] border border-[#2d2d4a] text-white px-4 py-3 rounded-lg mb-4 outline-none focus:ring-2 focus:ring-purple-500"
        />

        {error && <p className="text-red-400 mb-4 text-sm">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 rounded-lg transition mb-4"
        >
          {loading ? 'Loading...' : isRegister ? 'Register' : 'Login'}
        </button>

        <p
          onClick={() => setIsRegister(!isRegister)}
          className="text-center text-gray-500 hover:text-purple-400 cursor-pointer transition text-sm"
        >
          {isRegister ? 'Already have account? Login' : 'No account? Register'}
        </p>
      </div>
    </div>
  )
}