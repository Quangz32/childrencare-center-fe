@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

REM Script cài đặt dependencies cho dự án Children Care Frontend (Windows)
REM Hỗ trợ cả npm và yarn

echo ===================================
echo Children Care Frontend - Setup Script
echo ===================================
echo.

REM Kiểm tra Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js chưa được cài đặt!
    echo Vui lòng cài đặt Node.js từ: https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js version: %NODE_VERSION%

REM Kiểm tra npm
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm chưa được cài đặt!
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo ✅ npm version: %NPM_VERSION%

REM Kiểm tra yarn (tùy chọn)
where yarn >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('yarn --version') do set YARN_VERSION=%%i
    echo ✅ yarn version: !YARN_VERSION!
    set YARN_AVAILABLE=true
) else (
    echo ⚠️  yarn chưa được cài đặt (tùy chọn)
    set YARN_AVAILABLE=false
)

echo.

REM Chọn package manager
if "%YARN_AVAILABLE%"=="true" (
    echo Chọn package manager:
    echo 1^) npm (mặc định)
    echo 2^) yarn
    echo.
    set /p choice="Nhập lựa chọn (1-2) [1]: "
    
    if "!choice!"=="" set choice=1
    if "!choice!"=="2" (
        set PACKAGE_MANAGER=yarn
        set INSTALL_CMD=yarn install
    ) else (
        set PACKAGE_MANAGER=npm
        set INSTALL_CMD=npm install
    )
) else (
    set PACKAGE_MANAGER=npm
    set INSTALL_CMD=npm install
)

echo 📦 Sử dụng package manager: %PACKAGE_MANAGER%
echo.

REM Kiểm tra file package.json
if not exist "package.json" (
    echo ❌ Không tìm thấy file package.json!
    echo Vui lòng chạy script này từ thư mục gốc của dự án
    pause
    exit /b 1
)

echo ✅ Tìm thấy file package.json

REM Xóa node_modules và package-lock.json/yarn.lock cũ (nếu có)
echo 🧹 Dọn dẹp các file cũ...

if exist "node_modules" (
    echo Xóa thư mục node_modules cũ...
    rmdir /s /q "node_modules"
)

if "%PACKAGE_MANAGER%"=="npm" (
    if exist "yarn.lock" (
        echo Xóa yarn.lock (sử dụng npm)...
        del /f "yarn.lock"
    )
) else (
    if exist "package-lock.json" (
        echo Xóa package-lock.json (sử dụng yarn)...
        del /f "package-lock.json"
    )
)

REM Cài đặt dependencies
echo 📦 Cài đặt dependencies...
echo Chạy lệnh: %INSTALL_CMD%
echo.

%INSTALL_CMD%
if %errorlevel% neq 0 (
    echo ❌ Lỗi khi cài đặt dependencies!
    pause
    exit /b 1
)

echo ✅ Cài đặt dependencies thành công!
echo.

REM Kiểm tra các dependency quan trọng
echo 🔍 Kiểm tra các dependency quan trọng...

set DEPS=next react react-dom typescript tailwindcss

for %%d in (%DEPS%) do (
    if "%PACKAGE_MANAGER%"=="npm" (
        npm list %%d >nul 2>&1
        if !errorlevel! equ 0 (
            echo ✅ %%d
        ) else (
            echo ❌ %%d không được cài đặt
        )
    ) else (
        yarn list --pattern %%d >nul 2>&1
        if !errorlevel! equ 0 (
            echo ✅ %%d
        ) else (
            echo ❌ %%d không được cài đặt
        )
    )
)

echo.

REM Hiển thị thông tin về các script có sẵn
echo 📋 Các lệnh có sẵn:
echo   • %PACKAGE_MANAGER% run dev    - Chạy development server
echo   • %PACKAGE_MANAGER% run build  - Build production
echo   • %PACKAGE_MANAGER% run start  - Chạy production server
echo   • %PACKAGE_MANAGER% run lint   - Kiểm tra code style

echo.

REM Hướng dẫn tiếp theo
echo 🎉 Cài đặt hoàn tất!
echo Bước tiếp theo:
echo 1. Chạy: %PACKAGE_MANAGER% run dev
echo 2. Mở trình duyệt tại: http://localhost:3000

echo.
echo ===================================
echo Happy coding! 🚀
echo ===================================

pause 