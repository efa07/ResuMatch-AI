from flask import Blueprint, request, jsonify
from ..services.ai_service import optimize_resume
from ..services.file_parser import parse_bytes

bp = Blueprint("ai", __name__, url_prefix="/api/ai")


@bp.route("/optimize", methods=["POST"])
def ai_optimize():
    """
    Accepts either JSON with `resume_text` and `job_description`, or a
    multipart/form-data upload with `resume_file` and `job_description`.
    """
    resume_text = None
    job_description = None

    # Multipart/form-data with file
    if "resume_file" in request.files:
        resume_file = request.files.get("resume_file")
        job_description = request.form.get("job_description", "")
        try:
            file_bytes = resume_file.read()
            resume_text = parse_bytes(file_bytes, resume_file.filename)
        except Exception as e:
            return jsonify({"error": "Failed to parse uploaded file", "detail": str(e)}), 400
    else:
        data = request.get_json(force=True, silent=True) or {}
        resume_text = data.get("resume_text")
        job_description = data.get("job_description")

    if not resume_text:
        return jsonify({"error": "Missing resume text or file"}), 400

    optimized_resume, analysis = optimize_resume(resume_text, job_description)
    return jsonify({
        "optimized_resume": optimized_resume,
        "analysis": analysis
    })
