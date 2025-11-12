export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

export async function postOptimizeWithFile(file: File, jobDescription: string) {
  const form = new FormData()
  form.append("resume_file", file)
  form.append("job_description", jobDescription)

  const res = await fetch(`${API_URL}/api/ai/optimize`, {
    method: "POST",
    body: form,
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`API error: ${res.status} ${text}`)
  }

  return res.json()
}

export async function postOptimizeWithText(resumeText: string, jobDescription: string) {
  const res = await fetch(`${API_URL}/api/ai/optimize`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resume_text: resumeText, job_description: jobDescription }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`API error: ${res.status} ${text}`)
  }

  return res.json()
}
