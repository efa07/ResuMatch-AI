import os
import openai

openai.api_key = os.getenv("OPENAI_API_KEY")


def optimize_resume(resume_text, job_description):
    prompt = f"""
    Analyze the following resume and job description.
    1. Identify missing skills and keywords.
    2. Rewrite the resume to fit the job description naturally while keeping
    the same tone and structure.

    Resume:
    {resume_text}

    Job Description:
    {job_description}
    """
    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )

    optimized_resume = response.choices[0].message["content"]
    analysis = "AI optimized based on provided job description."

    return optimized_resume, analysis
