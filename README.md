# Resume Tailor Frontend

AI-powered resume tailoring platform frontend built with React + TypeScript.

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Axios

## Features

- User registration and login
- Resume upload (PDF, DOCX)
- ATS score analysis
- AI-powered resume generation
- Copy generated resume

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Project Structure
src/

├── api/

│   └── resumeApi.ts    # API calls to backend

├── pages/

│   ├── LoginPage.tsx   # Login/Register page

│   ├── HomePage.tsx    # Resume upload page

│   └── AnalyzePage.tsx # ATS analysis page

└── App.tsx             # Main app component

## Backend

This frontend connects to the Resume Tailor API.
Make sure backend is running on http://localhost:8000