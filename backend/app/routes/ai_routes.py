from flask import Blueprint, request, jsonify
from ..services.ai_service import optimize_resume

bp = Blueprint("ai", __name__, url_prefix="/api/ai")


@bp.route("/optimize", methods=["POST"])
def ai_optimize():
    data = request.json
    resume_text = data.get("resume_text")
    job_description = data.get("job_description")

    optimized_resume, analysis = optimize_resume(resume_text, job_description)
    return jsonify({
        "optimized_resume": optimized_resume,
        "analysis": analysis
    })
