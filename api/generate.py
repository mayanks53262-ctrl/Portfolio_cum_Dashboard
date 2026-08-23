from pathlib import Path
from runpy import run_path

implementation = Path(__file__).resolve().parent.parent / "projects" / "resume-portfolio-generator" / "api" / "generate.py"
globals().update(run_path(str(implementation)))

