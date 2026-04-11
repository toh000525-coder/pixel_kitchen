@echo off
cd /d "%~dp0"

echo Syncing with GitHub...
git fetch origin
git status

echo.
echo Staging all changes...
git add -A

echo.
set /p msg="Commit message (press Enter for 'update game'): "
if "%msg%"=="" set msg=update game
git commit -m "%msg%"

echo.
echo Pushing to GitHub...
git push origin main:update.main
if %errorlevel% == 0 (
  echo.
  echo Done! GitHub Pages will update in ~1 minute.
  echo https://toh000525-coder.github.io/pixel_kitchen/
) else (
  echo.
  echo Something went wrong. Check the error above.
  echo If there are remote changes, run: git reset --hard origin/update.main
  echo Then redo your changes and deploy again.
)
pause
