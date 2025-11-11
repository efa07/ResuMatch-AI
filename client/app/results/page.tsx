"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { CheckCircle2, AlertCircle, ArrowRight, TrendingUp } from "lucide-react"

export default function ResultsPage() {
  const router = useRouter()
  const [matchScore] = useState(68)

  const suggestions = [
    {
      type: "missing",
      title: "Missing Key Skills",
      items: ["Python", "Machine Learning", "Data Visualization", "SQL"],
    },
    {
      type: "improve",
      title: "Areas to Strengthen",
      items: ["Add quantifiable achievements", "Include project outcomes", "Highlight leadership experience"],
    },
    {
      type: "good",
      title: "Strong Points",
      items: ["Relevant work experience", "Clear project descriptions", "Professional formatting"],
    },
  ]

  return (
    <div className="min-h-screen bg-secondary/10">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Your <span className="ai-gradient-text">Match Analysis</span>
          </h1>
          <p className="text-lg text-muted-foreground">Here's how your resume stacks up against the job description</p>
        </div>

        {/* Match Score */}
        <Card className="p-8 mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Match Score</span>
          </div>

          <div className="relative w-48 h-48 mx-auto mb-6">
            <svg className="transform -rotate-90 w-48 h-48">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-border"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="url(#gradient)"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={`${matchScore * 5.53} 553`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="oklch(0.65 0.18 210)" />
                  <stop offset="100%" stopColor="oklch(0.55 0.22 264)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold ai-gradient-text">{matchScore}%</span>
              <span className="text-sm text-muted-foreground">Match Rate</span>
            </div>
          </div>

          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            Your resume is a <strong className="text-foreground">good match</strong> for this position. With some
            optimization, you could reach 85%+ and significantly increase your interview chances.
          </p>

          <Button
            size="lg"
            className="ai-gradient text-white hover:opacity-90"
            onClick={() => router.push("/optimized")}
          >
            Rewrite My Resume
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Card>

        {/* Suggestions */}
        <div className="grid md:grid-cols-3 gap-6">
          {suggestions.map((section, idx) => (
            <Card key={idx} className="p-6">
              <div className="flex items-start gap-3 mb-4">
                {section.type === "missing" && (
                  <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-5 h-5 text-destructive" />
                  </div>
                )}
                {section.type === "improve" && (
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-accent" />
                  </div>
                )}
                {section.type === "good" && (
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                )}
                <h3 className="text-lg font-semibold">{section.title}</h3>
              </div>
              <ul className="space-y-2">
                {section.items.map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-foreground mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
