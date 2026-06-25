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
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
      <div className="bg-[#1a1a2e] border border-[#2d2d4a] p-8 rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-1">Resume Tailor</h1>
          <p className="text-purple-400 text-sm">Upload your resume to get started</p>
        </div>

        <div className="border-2 border-dashed border-[#2d2d4a] hover:border-purple-700 rounded-xl p-8 text-center mb-6 transition">
          <p className="text-gray-500 mb-4 text-sm">Drop your resume here or click to browse</p>
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={e => setFile(e.target.files?.[0] || null)}
            className="hidden"
            id="file-input"
          />
          <label
            htmlFor="file-input"
            className="bg-[#12121a] border border-[#2d2d4a] hover:border-purple-500 text-white px-6 py-2 rounded-lg cursor-pointer transition text-sm"
          >
            Browse File
          </label>
          {file && (
            <p className="text-purple-400 mt-4 text-sm">✓ {file.name}</p>
          )}
        </div>

        {error && <p className="text-red-400 mb-4 text-sm">{error}</p>}

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="w-full bg-purple-700 hover:bg-purple-800 disabled:bg-[#2d2d4a] disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition"
        >
          {loading ? 'Uploading...' : 'Upload Resume'}
        </button>
      </div>
    </div>
  )
}