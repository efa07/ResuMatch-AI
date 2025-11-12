import os
import json
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage

load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY not found in .env file")

# Configure Gemini model
llm = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash",
    temperature=0.2,
    google_api_key=GOOGLE_API_KEY,
    max_tokens=None,
    max_retries=2,
)

def optimize_resume(resume_text, job_description):
    """
    Use Gemini to analyze and optimize a resume for a given job description.
    Returns a tuple: (optimized_resume, structured_analysis)
    """

    prompt = f"""
    You are an expert AI resume optimizer and recruiter assistant.

    The user uploaded a resume and a job description. 
    1. Analyze how well the resume matches the job description.
    2. Identify missing keywords or skills from the job posting.
    3. Suggest improvements.
    4. Highlight strengths.
    5. Then rewrite or optimize the resume to better match the job.

    Return your response as a **strict JSON** object with this structure:
    {{
        "score": <integer 0-100>,
        "match_summary": "<short summary of how the resume fits>",
        "missing_keywords": ["keyword1", "keyword2"],
        "suggestions": ["improvement1", "improvement2"],
        "highlights": ["strength1", "strength2"],
        "optimized_resume": "<the improved resume text>"
    }}

    --- Resume ---
    {resume_text}

    --- Job Description ---
    {job_description}
    """

    response = llm.invoke([HumanMessage(content=prompt)])
    raw_output = response.content.strip()

    # Try to parse the JSON safely
    try:
        data = json.loads(raw_output)
        optimized = data.get("optimized_resume", "")
        analysis = {
            "score": data.get("score", 0),
            "match_summary": data.get("match_summary", ""),
            "missing_keywords": data.get("missing_keywords", []),
            "suggestions": data.get("suggestions", []),
            "highlights": data.get("highlights", []),
            "match_score": data.get("score", 0),  # alias for frontend
        }
        return optimized, analysis
    except json.JSONDecodeError:
        # fallback if model didn’t follow JSON format perfectly
        return raw_output, {
            "score": 0,
            "match_summary": "AI response could not be parsed properly.",
            "missing_keywords": [],
            "suggestions": [],
            "highlights": [],
            "match_score": 0,
        }
