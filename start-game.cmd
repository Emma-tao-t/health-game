@echo off
cd /d "%~dp0"
npm.cmd run build
if errorlevel 1 pause & exit /b 1
node scripts\serve-dist.mjs
