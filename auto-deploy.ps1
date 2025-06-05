# Auto-Deploy Script for CalcAI Website
# This script automatically commits and pushes changes to GitHub

Write-Host "🚀 Starting Auto-Deploy for CalcAI..." -ForegroundColor Green

# Check if there are any changes
$status = git status --porcelain
if ($status) {
    Write-Host "📝 Changes detected, committing..." -ForegroundColor Yellow
    
    # Add all changes
    git add .
    
    # Create commit with timestamp
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $commitMessage = "Auto-deploy: Updates at $timestamp"
    git commit -m $commitMessage
    
    # Push to GitHub
    Write-Host "📤 Pushing to GitHub..." -ForegroundColor Blue
    git push origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Successfully deployed to GitHub!" -ForegroundColor Green
        Write-Host "🌐 Vercel will automatically deploy your changes." -ForegroundColor Cyan
    } else {
        Write-Host "❌ Failed to push to GitHub" -ForegroundColor Red
    }
} else {
    Write-Host "✨ No changes to deploy" -ForegroundColor Gray
}

Write-Host "🏁 Auto-Deploy completed!" -ForegroundColor Green
