"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Upload, FileText, Briefcase } from "lucide-react"
import { Card } from "@/components/ui/card"
import { postOptimizeWithFile } from "@/lib/api"

export default function UploadPage() {
  const router = useRouter()
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setResumeFile(file)
    }
  }

  const handleAnalyze = async () => {
    if (!resumeFile || !jobDescription) return

    setIsAnalyzing(true)
    try {
      const data = await postOptimizeWithFile(resumeFile, jobDescription)
      // store result for results page
      if (typeof window !== "undefined") {
        window.localStorage.setItem("resumatch_analysis", JSON.stringify(data))
      }
      router.push("/results")
    } catch (err: any) {
      console.error(err)
      alert("Failed to analyze resume: " + (err?.message || err))
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen bg-secondary/10">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Upload Your <span className="ai-gradient-text">Resume</span>
          </h1>
          <p className="text-lg text-muted-foreground">Let's analyze your resume and match it with your target job</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Resume Upload */}
          <Card className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Upload Your Resume</h2>
                <p className="text-sm text-muted-foreground">PDF or DOCX format</p>
              </div>
            </div>

            <label className="block">
              <input
                type="file"
                accept=".pdf,.docx"
                onChange={handleResumeUpload}
                className="hidden"
                id="resume-upload"
              />
              <div className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer">
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                {resumeFile ? (
                  <div>
                    <p className="font-medium text-foreground mb-1">{resumeFile.name}</p>
                    <p className="text-sm text-muted-foreground">Click to change file</p>
                  </div>
                ) : (
                  <div>
                    <p className="font-medium text-foreground mb-1">Click to upload</p>
                    <p className="text-sm text-muted-foreground">or drag and drop your resume here</p>
                  </div>
                )}
              </div>
            </label>
          </Card>

          {/* Job Description */}
          <Card className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Job Description</h2>
                <p className="text-sm text-muted-foreground">Paste or upload the job posting</p>
              </div>
            </div>

            <textarea
              placeholder="Paste the job description here...&#10;&#10;Include requirements, responsibilities, and any keywords from the job posting."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full h-[240px] px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </Card>
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="ai-gradient text-white hover:opacity-90 text-lg px-12 h-14"
            onClick={handleAnalyze}
            disabled={!resumeFile || !jobDescription || isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <span className="inline-block animate-spin mr-2">⚡</span>
                Analyzing...
              </>
            ) : (
              "Analyze My Resume"
            )}
          </Button>

          <p className="text-sm text-muted-foreground mt-4">Analysis takes about 5-10 seconds</p>
        </div>
      </main>
    </div>
  )
}
