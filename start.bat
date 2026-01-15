@echo off
REM ============================================================================
REM HEALTH & FITNESS DASHBOARD - STARTUP SCRIPT
REM ============================================================================
REM 
REM This script will:
REM 1. Check if Node.js is installed
REM 2. Install project dependencies (npm install)
REM 3. Start the development server
REM 4. Automatically open the browser to view the application
REM
REM Usage: Double-click this file or run from command prompt
REM ============================================================================

echo.
echo ============================================================
echo   HEALTH ^& FITNESS DASHBOARD - Starting Application
echo ============================================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo Download the LTS version and run the installer.
    echo.
    pause
    exit /b 1
)

REM Display Node.js version
echo [INFO] Node.js version:
node --version
echo.

REM Check if npm is available
where npm >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] npm is not installed or not in PATH!
    echo.
    echo Please reinstall Node.js from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

REM Display npm version
echo [INFO] npm version:
npm --version
echo.

REM Change to the script's directory
cd /d "%~dp0"
echo [INFO] Working directory: %cd%
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo [INFO] Installing dependencies... This may take a few minutes.
    echo.
    npm install
    if %ERRORLEVEL% neq 0 (
        echo.
        echo [ERROR] Failed to install dependencies!
        echo Please check your internet connection and try again.
        echo.
        pause
        exit /b 1
    )
    echo.
    echo [SUCCESS] Dependencies installed successfully!
    echo.
) else (
    echo [INFO] Dependencies already installed.
    echo.
)

echo ============================================================
echo   Starting Development Server...
echo ============================================================
echo.
echo The application will open in your default browser shortly.
echo.
echo To stop the server, press Ctrl+C in this window.
echo.
echo ============================================================

REM Start the development server (this will auto-open the browser)
npm start
