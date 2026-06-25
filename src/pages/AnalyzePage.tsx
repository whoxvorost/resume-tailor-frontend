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

  return (
    <div style={{ maxWidth: 700, margin: '50px auto', padding: 20 }}>
      <h2>Analyze & Generate Resume</h2>

      <textarea
        placeholder="Paste job description here..."
        value={jobDescription}
        onChange={e => setJobDescription(e.target.value)}
        style={{ width: '100%', height: 150, padding: 8, marginBottom: 10 }}
      />

      <button onClick={handleAnalyze} disabled={loading} style={{ padding: 10, marginRight: 10 }}>
        {loading ? 'Analyzing...' : 'Analyze ATS Score'}
      </button>

      {atsScore !== null && (
        <div style={{ marginTop: 20 }}>
          <h3>ATS Score: {atsScore}%</h3>
          <h4>Missing Keywords:</h4>
          <ul>
            {missingKeywords.map(kw => <li key={kw}>{kw}</li>)}
          </ul>

          <button onClick={handleGenerate} disabled={generating} style={{ padding: 10, width: '100%' }}>
            {generating ? 'Generating...' : 'Generate Tailored Resume'}
          </button>
        </div>
      )}

      {generatedResume && (
        <div style={{ marginTop: 20 }}>
          <h3>Generated Resume:</h3>
          <pre style={{ background: '#f5f5f5', padding: 15, whiteSpace: 'pre-wrap' }}>
            {generatedResume}
          </pre>
        </div>
      )}
    </div>
  )
}