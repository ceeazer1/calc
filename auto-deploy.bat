@echo off
setlocal enabledelayedexpansion

set REMOTE_URL=https://github.com/ceeazer1/calc
set BRANCH=main

echo 🚀 Starting Auto-Deploy for CalcAI...

REM Initialize repo if needed
git rev-parse --is-inside-work-tree >nul 2>&1
if not %errorlevel%==0 (
  echo 🧪 Initializing new git repository...
  git init >nul 2>&1
  git branch -M %BRANCH% >nul 2>&1
  git config user.name "CalcAI Auto Agent"
  git config user.email "auto@calcai.cc"
)

REM Ensure origin remote
for /f "tokens=*" %%r in ('git remote -v 2^>nul') do set hasRemote=1
if not defined hasRemote (
  echo 🔗 Adding origin remote -> %REMOTE_URL%
  git remote add origin %REMOTE_URL% >nul 2>&1
) else (
  echo 🔗 Ensuring origin remote set to %REMOTE_URL%
  git remote set-url origin %REMOTE_URL% >nul 2>&1
)

REM Fetch and merge remote main if exists
git fetch origin %BRANCH% >nul 2>&1
if %errorlevel%==0 (
  echo 📥 Fetched origin/%BRANCH%
  git merge --allow-unrelated-histories origin/%BRANCH% -m "Merge remote %BRANCH% into local" >nul 2>&1
)

REM Stage and commit changes
git status --porcelain > temp_status.txt
set /p status=<temp_status.txt
if defined status (
    echo 📝 Changes detected, committing...
    git add -A >nul 2>&1
    for /f "tokens=1-4 delims=/ " %%i in ('date /t') do set mydate=%%i-%%j-%%k
    for /f "tokens=1-2 delims=: " %%i in ('time /t') do set mytime=%%i:%%j
    set timestamp=%mydate% %mytime%
    git commit -m "Auto-deploy: Updates at %timestamp%" >nul 2>&1
) else (
    echo ℹ️  No local changes to commit (still pushing to sync)
)
del temp_status.txt >nul 2>&1

REM Push to GitHub
echo 📤 Pushing to GitHub...
git push -u origin %BRANCH%
if %errorlevel% equ 0 (
    echo ✅ Successfully pushed to GitHub (%BRANCH%)!
    echo 🌐 Vercel should automatically deploy your changes.
) else (
    echo ❌ Failed to push to GitHub
)

endlocal
echo 🏁 Auto-Deploy completed!
