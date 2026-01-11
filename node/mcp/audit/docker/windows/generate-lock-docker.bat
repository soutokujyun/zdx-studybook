@echo off
REM 使用Docker容器生成lock文件的脚本 (Windows版本)
REM 确保在固定环境中生成一致的lock文件

setlocal enabledelayedexpansion

set IMAGE_NAME=mcp-audit-env
set IMAGE_TAG=latest
set WORK_DIR=%1

if "%WORK_DIR%"=="" (
    echo Usage: %0 ^<work_directory^>
    echo Example: %0 C:\path\to\work\dir
    exit /b 1
)

if not exist "%WORK_DIR%" (
    echo Error: Work directory does not exist: %WORK_DIR%
    exit /b 1
)

echo Generating lock file in Docker container...
echo Work directory: %WORK_DIR%
echo Using Docker image: %IMAGE_NAME%:%IMAGE_TAG%

REM 在Docker容器中运行npm install --package-lock-only --force
docker run --rm -v "%WORK_DIR%:/workspace" -w /workspace "%IMAGE_NAME%:%IMAGE_TAG%" npm install --package-lock-only --force

if %ERRORLEVEL% EQU 0 (
    echo Lock file generated successfully in: %WORK_DIR%\package-lock.json
) else (
    echo Failed to generate lock file
    exit /b 1
)
