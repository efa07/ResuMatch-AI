from flask import Flask
from .config import Config
from .extensions import db, migrate, cors
from .routes import auth_routes, resume_routes, job_routes, ai_routes


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Init extensions
    db.init_app(app)
    migrate.init_app(app, db)
    cors.init_app(app)

    # Register blueprints
    app.register_blueprint(auth_routes.bp)
    app.register_blueprint(resume_routes.bp)
    app.register_blueprint(job_routes.bp)
    app.register_blueprint(ai_routes.bp)

    return app
