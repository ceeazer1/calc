@echo off
echo 🚀 Starting Auto-Deploy for CalcAI...

REM Check if there are any changes
git status --porcelain > temp_status.txt
set /p status=<temp_status.txt
del temp_status.txt

if not "%status%"=="" (
    echo 📝 Changes detected, committing...
    
    REM Add all changes
    git add .
    
    REM Create commit with timestamp
    for /f "tokens=1-4 delims=/ " %%i in ('date /t') do set mydate=%%i-%%j-%%k
    for /f "tokens=1-2 delims=: " %%i in ('time /t') do set mytime=%%i:%%j
    set timestamp=%mydate% %mytime%
    git commit -m "Auto-deploy: Updates at %timestamp%"
    
    REM Push to GitHub
    echo 📤 Pushing to GitHub...
    git push origin main
    
    if %errorlevel% equ 0 (
        echo ✅ Successfully deployed to GitHub!
        echo 🌐 Vercel will automatically deploy your changes.
    ) else (
        echo ❌ Failed to push to GitHub
    )
) else (
    echo ✨ No changes to deploy
)

echo 🏁 Auto-Deploy completed!
pause
