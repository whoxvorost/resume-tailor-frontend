import { useState } from 'react'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import AnalyzePage from './pages/AnalyzePage'

export default function App() {
  const [token, setToken] = useState<string | null>(null)
  const [resumeId, setResumeId] = useState<number | null>(null)

  if (!token) {
    return <LoginPage onLogin={setToken} />
  }

  if (!resumeId) {
    return <HomePage token={token} onUpload={setResumeId} />
  }

  return <AnalyzePage token={token} resumeId={resumeId} />
}