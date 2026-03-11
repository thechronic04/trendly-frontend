@echo off
set GIT=C:\Users\dasb4\AppData\Local\GitHubDesktop\app-3.5.6\resources\app\git\cmd\git.exe
set REPO=C:\Users\dasb4\.gemini\antigravity\scratch\trendly\frontend\trendly-frontend

%GIT% -C %REPO% -c user.name=thechronic04 -c user.email=dasb4@trendly.ai commit -m "refactor: extract components and add pages"
%GIT% -C %REPO% push origin main

echo Done!
pause
