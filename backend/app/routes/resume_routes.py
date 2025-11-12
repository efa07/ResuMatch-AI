from flask import Blueprint, jsonify

bp = Blueprint("resume", __name__, url_prefix="/api/resume")

@bp.route("/ping", methods=["GET"])
def ping():
	return jsonify({"ok": True, "service": "resume"})
