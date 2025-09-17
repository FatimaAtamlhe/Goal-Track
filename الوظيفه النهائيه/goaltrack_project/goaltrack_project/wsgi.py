"""
WSGI config for goaltrack_project project.

It exposes the WSGI callable as a module-level variable named ``application``.
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "goaltrack_project.settings")

application = get_wsgi_application()

