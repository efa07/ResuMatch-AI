"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Download, Copy, Check, Sparkles } from "lucide-react"

export default function OptimizedPage() {
  const [copied, setCopied] = useState(false)

  const optimizedResume = `JOHN DOE
Software Engineer | Machine Learning Specialist
john.doe@email.com | (555) 123-4567 | linkedin.com/in/johndoe

PROFESSIONAL SUMMARY
Results-driven Software Engineer with 5+ years of experience in Python development, machine learning, and data visualization. Proven track record of delivering scalable solutions that increased system performance by 40% and reduced processing time by 60%. Expertise in SQL, Python, and modern ML frameworks.

TECHNICAL SKILLS
• Programming: Python, JavaScript, SQL, R
• ML/AI: TensorFlow, PyTorch, Scikit-learn, Machine Learning
• Data: Data Visualization, Pandas, NumPy, SQL Databases
• Tools: Git, Docker, AWS, CI/CD

PROFESSIONAL EXPERIENCE

Senior Software Engineer | Tech Solutions Inc. | 2021 - Present
• Led machine learning initiatives that improved prediction accuracy by 35%, directly impacting 50K+ users
• Developed Python-based data visualization dashboards, reducing reporting time by 60%
• Implemented SQL database optimizations resulting in 40% faster query performance
• Mentored team of 4 junior engineers, establishing best practices for ML model deployment

Software Engineer | Digital Innovations Co. | 2019 - 2021
• Built end-to-end machine learning pipelines processing 1M+ data points daily
• Created interactive data visualization tools using Python and modern frameworks
• Collaborated with cross-functional teams to deliver 12+ projects on time and under budget
• Optimized SQL queries and database architecture, improving application response time by 45%

EDUCATION
Bachelor of Science in Computer Science | State University | 2019
GPA: 3.8/4.0 | Dean's List

CERTIFICATIONS
• AWS Certified Machine Learning - Specialty
• Python for Data Science and Machine Learning Bootcamp`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(optimizedResume)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const element = document.createElement("a")
    const file = new Blob([optimizedResume], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "optimized-resume.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="min-h-screen bg-secondary/10">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Optimized</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Your <span className="ai-gradient-text">Optimized Resume</span>
          </h1>
          <p className="text-lg text-muted-foreground">Enhanced with targeted keywords and improved formatting</p>
        </div>

        <Card className="p-8 mb-6">
          <div className="bg-background rounded-lg p-6 border border-border mb-6 max-h-[600px] overflow-y-auto">
            <pre className="font-mono text-sm whitespace-pre-wrap text-foreground leading-relaxed">
              {optimizedResume}
            </pre>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="ai-gradient text-white hover:opacity-90" onClick={handleDownload}>
              <Download className="w-5 h-5 mr-2" />
              Download as PDF
            </Button>
            <Button size="lg" variant="outline" onClick={handleCopy} disabled={copied}>
              {copied ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5 mr-2" />
                  Copy Text
                </>
              )}
            </Button>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            What We Improved
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>Added missing keywords: Python, Machine Learning, Data Visualization, SQL</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>Quantified achievements with metrics and percentages</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>Highlighted leadership and mentorship experience</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              <span>Improved formatting and readability for ATS systems</span>
            </li>
          </ul>
        </Card>
      </main>
    </div>
  )
}
