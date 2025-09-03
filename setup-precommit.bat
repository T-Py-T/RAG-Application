@echo off

REM Setup script for pre-commit hooks (Windows)
REM This script sets up pre-commit hooks for the RAG Application

echo Setting up pre-commit hooks for RAG Application...

REM Check if Python is available
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python is required but not installed.
    pause
    exit /b 1
)

REM Install pre-commit if not already installed
pre-commit --version >nul 2>&1
if errorlevel 1 (
    echo Installing pre-commit...
    pip install pre-commit
) else (
    echo pre-commit is already installed.
)

REM Install the pre-commit hooks
echo Installing pre-commit hooks...
pre-commit install

REM Run pre-commit on all files to check current status
echo Running pre-commit checks on all files...
pre-commit run --all-files

echo.
echo Pre-commit setup complete!
echo.
echo Pre-commit hooks will now run automatically on every commit.
echo You can also run them manually with:
echo   pre-commit run --all-files
echo.
echo To update hooks to their latest versions:
echo   pre-commit autoupdate
echo.

pause
