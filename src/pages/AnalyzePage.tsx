import { useState } from 'react'
import { analyzeResume, generateResume } from '../api/resumeApi'

interface Props {
  token: string
  resumeId: number
}

export default function AnalyzePage({ token, resumeId }: Props) {
  const [jobDescription, setJobDescription] = useState('')
  const [atsScore, setAtsScore] = useState<number | null>(null)
  const [missingKeywords, setMissingKeywords] = useState<string[]>([])
  const [generatedResume, setGeneratedResume] = useState('')
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)

  const handleAnalyze = async () => {
    setLoading(true)
    try {
      const data = await analyzeResume(resumeId, jobDescription, token)
      setAtsScore(data.ats_score)
      setMissingKeywords(data.missing_keywords)
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  const handleGenerate = async () => {
    setGenerating(true)
    try {
      const data = await generateResume(resumeId, jobDescription, token)
      setGeneratedResume(data.generated_resume)
    } catch (e) {
      console.error(e)
    }
    setGenerating(false)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedResume)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-1">Resume Tailor</h1>
          <p className="text-purple-400 text-sm">Paste job description to analyze and generate</p>
        </div>

        <div className="bg-[#1a1a2e] border border-[#2d2d4a] rounded-2xl p-6 mb-6">
          <h2 className="text-white font-semibold mb-3">Job Description</h2>
          <textarea
            placeholder="Paste job description here..."
            value={jobDescription}
            onChange={e => setJobDescription(e.target.value)}
            className="w-full bg-[#12121a] border border-[#2d2d4a] text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 h-40 resize-none text-sm"
          />
          <button
            onClick={handleAnalyze}
            disabled={loading || !jobDescription}
            className="mt-4 w-full bg-purple-700 hover:bg-purple-800 disabled:bg-[#2d2d4a] disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition"
          >
            {loading ? 'Analyzing...' : 'Analyze ATS Score'}
          </button>
        </div>

        {atsScore !== null && (
          <div className="bg-[#1a1a2e] border border-[#2d2d4a] rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold">ATS Score</h2>
              <span className={`text-2xl font-bold ${atsScore > 50 ? 'text-green-400' : 'text-red-400'}`}>
                {atsScore}%
              </span>
            </div>

            <h3 className="text-gray-500 text-sm mb-3">Missing Keywords:</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {missingKeywords.map(kw => (
                <span key={kw} className="bg-purple-900 border border-purple-700 text-purple-300 px-3 py-1 rounded-full text-xs">
                  {kw}
                </span>
              ))}
            </div>

            <button
              onClick={handleGenerate}
              disabled={generating}
              className="w-full bg-purple-700 hover:bg-purple-800 disabled:bg-[#2d2d4a] text-white font-semibold py-3 rounded-lg transition"
            >
              {generating ? 'Generating... (30 seconds)' : 'Generate Tailored Resume'}
            </button>
          </div>
        )}

        {generatedResume && (
          <div className="bg-[#1a1a2e] border border-[#2d2d4a] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold">Generated Resume</h2>
              <button
                onClick={handleCopy}
                className="bg-[#12121a] border border-[#2d2d4a] hover:border-purple-500 text-gray-400 hover:text-white px-4 py-2 rounded-lg text-sm transition"
              >
                Copy
              </button>
            </div>
            <pre className="text-gray-300 whitespace-pre-wrap text-sm leading-relaxed">
              {generatedResume}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}