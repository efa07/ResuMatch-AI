from flask import Blueprint, jsonify

bp = Blueprint("auth", __name__, url_prefix="/api/auth")

@bp.route("/ping", methods=["GET"])
def ping():
	return jsonify({"ok": True, "service": "auth"})
