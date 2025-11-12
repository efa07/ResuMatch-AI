from flask import Blueprint, jsonify

bp = Blueprint("job", __name__, url_prefix="/api/job")

@bp.route("/ping", methods=["GET"])
def ping():
	return jsonify({"ok": True, "service": "job"})
