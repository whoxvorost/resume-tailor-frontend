import axios from 'axios'

const API_URL = 'http://localhost:8000'

const api = axios.create({
  baseURL: API_URL,
})

export const register = async (email: string, password: string) => {
  const response = await api.post('/auth/register', { email, password })
  return response.data
}

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password })
  return response.data
}

export const uploadResume = async (file: File, token: string) => {
  const formData = new FormData()
  formData.append('file', file)
  const response = await api.post('/resume/upload', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

export const analyzeResume = async (resumeId: number, jobDescription: string, token: string) => {
  const response = await api.post('/resume/analyze',
    { resume_id: resumeId, job_description: jobDescription },
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return response.data
}

export const generateResume = async (resumeId: number, jobDescription: string, token: string) => {
  const response = await api.post('/resume/generate',
    { resume_id: resumeId, job_description: jobDescription },
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return response.data
}