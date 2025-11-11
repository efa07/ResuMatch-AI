import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Sparkles, Target, Zap, TrendingUp } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden ai-wave-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 mb-8">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">AI-Powered Resume Optimization</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-balance">
              <span className="ai-gradient-text">Smarter Resumes,</span>
              <br />
              Faster Interviews
            </h1>

            <p className="text-xl text-muted-foreground mb-10 text-pretty">
              Let AI analyze and optimize your resume to match any job description. Get actionable insights and boost
              your chances of landing interviews.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="ai-gradient text-white hover:opacity-90 text-lg px-8 h-12" asChild>
                <Link href="/upload">Try Now — It's Free</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 h-12 bg-transparent" asChild>
                <Link href="#features">Learn More</Link>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-6">No credit card required • Works with PDF and DOCX</p>
          </div>
        </div>

        {/* Decorative geometric wave */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How ResuMatch AI Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI analyzes your resume against job requirements and provides intelligent recommendations to help you
              stand out.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-2xl p-8 border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl ai-gradient flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Analysis</h3>
              <p className="text-muted-foreground">
                AI compares your resume with job descriptions to identify gaps, missing keywords, and areas for
                improvement.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl ai-gradient flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Instant Optimization</h3>
              <p className="text-muted-foreground">
                Get a rewritten resume tailored to the job in seconds, with improved wording and strategic keyword
                placement.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl ai-gradient flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Match Score</h3>
              <p className="text-muted-foreground">
                See your compatibility score and understand exactly what changes will maximize your interview chances.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-12 border border-border">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Stand Out?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of job seekers who've improved their resumes with AI
            </p>
            <Button size="lg" className="ai-gradient text-white hover:opacity-90 text-lg px-8 h-12" asChild>
              <Link href="/upload">Start Optimizing Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
