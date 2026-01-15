@echo off
REM ============================================================
REM Health & Fitness Dashboard - Start Script for Windows
REM ============================================================
REM 
REM This script will:
REM 1. Check if Node.js is installed
REM 2. Install dependencies if needed (node_modules folder)
REM 3. Start the React development server
REM 4. Automatically open the application in the default browser
REM
REM Requirements:
REM - Node.js (v14 or higher) and npm must be installed
REM ============================================================

echo.
echo ============================================================
echo   Health ^& Fitness Dashboard - Starting Application
echo ============================================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

REM Display Node.js version
echo [INFO] Checking Node.js installation...
node --version
echo.

REM Check if npm is installed
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] npm is not installed!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

REM Display npm version
echo [INFO] Checking npm installation...
npm --version
echo.

REM Check if node_modules exists, if not, install dependencies
if not exist "node_modules" (
    echo [INFO] Installing dependencies... This may take a few minutes.
    echo.
    call npm install
    if %errorlevel% neq 0 (
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

REM Start the React development server
echo ============================================================
echo   Starting React Development Server...
echo ============================================================
echo.
echo The application will automatically open in your browser.
echo If it doesn't open automatically, navigate to:
echo.
echo     http://localhost:3000
echo.
echo Press Ctrl+C to stop the server.
echo.
echo ============================================================
echo.

REM Start the development server (this will open the browser automatically)
call npm start

REM This line will only execute if the server stops
echo.
echo [INFO] Development server stopped.
pause
