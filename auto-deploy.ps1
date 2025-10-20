# Auto-Deploy Script for CalcAI Website
# Initializes repo if needed, commits, and pushes to GitHub (ceeazer1/calc)

param(
  [string]$RemoteUrl = "https://github.com/ceeazer1/calc",
  [string]$Branch = "main"
)

Write-Host "🚀 Starting Auto-Deploy for CalcAI..." -ForegroundColor Green

# Ensure we're in a git repo (init if needed)
$insideRepo = $false
try {
  git rev-parse --is-inside-work-tree > $null 2>&1
  if ($LASTEXITCODE -eq 0) { $insideRepo = $true }
} catch {}

if (-not $insideRepo) {
  Write-Host "🧩 Initializing new git repository..." -ForegroundColor Yellow
  git init | Out-Null
  git branch -M $Branch | Out-Null
  git config user.name "CalcAI Auto Agent"
  git config user.email "auto@calcai.cc"
}

# Ensure origin remote points to desired URL
$remotes = git remote -v 2>$null
if (-not $remotes -or -not ($remotes -match "origin")) {
  Write-Host "🔗 Adding origin remote -> $RemoteUrl" -ForegroundColor Yellow
  git remote add origin $RemoteUrl 2>$null
} else {
  Write-Host "🔗 Ensuring origin remote set to $RemoteUrl" -ForegroundColor Yellow
  git remote set-url origin $RemoteUrl 2>$null
}

# Try to fetch existing main and merge (handles unrelated histories)
git fetch origin $Branch 2>$null
if ($LASTEXITCODE -eq 0) {
  Write-Host "📥 Fetched origin/$Branch" -ForegroundColor Cyan
  git merge --allow-unrelated-histories origin/$Branch -m "Merge remote $Branch into local" 2>$null
}

# Stage and commit
$status = git status --porcelain
if ($status) {
  Write-Host "📝 Changes detected, committing..." -ForegroundColor Yellow
  git add -A
  $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
  $commitMessage = "Auto-deploy: Updates at $timestamp"
  git commit -m $commitMessage
} else {
  Write-Host "ℹ️ No local changes to commit (still pushing to sync)" -ForegroundColor Gray
}

# Push
Write-Host "📤 Pushing to GitHub..." -ForegroundColor Blue
git push -u origin $Branch
if ($LASTEXITCODE -eq 0) {
  Write-Host "✅ Successfully pushed to GitHub ($Branch)!" -ForegroundColor Green
  Write-Host "🌐 Vercel should auto-deploy your changes." -ForegroundColor Cyan
} else {
  Write-Host "❌ Failed to push to GitHub" -ForegroundColor Red
}

Write-Host "🏁 Auto-Deploy completed!" -ForegroundColor Green
