import { useState } from 'react'
import { uploadResume } from '../api/resumeApi'

interface Props {
  token: string
  onUpload: (resumeId: number) => void
}

export default function HomePage({ token, onUpload }: Props) {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)
    try {
      const data = await uploadResume(file, token)
      onUpload(data.id)
    } catch (e) {
      setError('Upload failed. Only PDF or DOCX allowed.')
    }
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: 600, margin: '100px auto', padding: 20 }}>
      <h1>Resume Tailor</h1>
      <h2>Upload Your Resume</h2>

      <input
        type="file"
        accept=".pdf,.docx"
        onChange={e => setFile(e.target.files?.[0] || null)}
        style={{ marginBottom: 10 }}
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button
        onClick={handleUpload}
        disabled={!file || loading}
        style={{ padding: 10, width: '100%' }}
      >
        {loading ? 'Uploading...' : 'Upload Resume'}
      </button>
    </div>
  )
}