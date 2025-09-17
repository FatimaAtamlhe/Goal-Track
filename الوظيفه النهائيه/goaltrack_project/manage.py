#!/usr/bin/env python
import os
import sys
from pathlib import Path


def main() -> None:
	"""Run administrative tasks."""
	# Ensure parent directory is on sys.path so top-level apps (e.g., tracker) import correctly
	current_dir = Path(__file__).resolve().parent
	parent_dir = current_dir.parent
	if str(parent_dir) not in sys.path:
		sys.path.insert(0, str(parent_dir))

	os.environ.setdefault("DJANGO_SETTINGS_MODULE", "goaltrack_project.settings")
	try:
		from django.core.management import execute_from_command_line
	except ImportError as exc:
		raise ImportError(
			"Couldn't import Django. Are you sure it's installed and available on your\n"
			"PYTHONPATH environment variable? Did you forget to activate a virtual environment?"
		) from exc
	execute_from_command_line(sys.argv)


if __name__ == "__main__":
	main()

