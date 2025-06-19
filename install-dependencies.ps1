# Script cài đặt dependencies cho dự án Children Care Frontend (PowerShell)
# Hỗ trợ cả npm và yarn

# Set execution policy for current process
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process -Force

# Function để in màu
function Write-ColoredText {
    param(
        [string]$Text,
        [string]$Color = "White"
    )
    Write-Host $Text -ForegroundColor $Color
}

function Write-Header {
    param([string]$Text)
    Write-ColoredText $Text "Cyan"
}

function Write-Success {
    param([string]$Text)
    Write-ColoredText $Text "Green"
}

function Write-Warning {
    param([string]$Text)
    Write-ColoredText $Text "Yellow"
}

function Write-Error {
    param([string]$Text)
    Write-ColoredText $Text "Red"
}

# Header
Write-Header "==================================="
Write-Header "Children Care Frontend - Setup Script"
Write-Header "==================================="
Write-Host ""

# Kiểm tra Node.js
try {
    $nodeVersion = node --version
    Write-Success "✅ Node.js version: $nodeVersion"
} catch {
    Write-Error "❌ Node.js chưa được cài đặt!"
    Write-Warning "Vui lòng cài đặt Node.js từ: https://nodejs.org/"
    Read-Host "Nhấn Enter để thoát"
    exit 1
}

# Kiểm tra npm
try {
    $npmVersion = npm --version
    Write-Success "✅ npm version: $npmVersion"
} catch {
    Write-Error "❌ npm chưa được cài đặt!"
    Read-Host "Nhấn Enter để thoát"
    exit 1
}

# Kiểm tra yarn (tùy chọn)
$yarnAvailable = $false
try {
    $yarnVersion = yarn --version
    Write-Success "✅ yarn version: $yarnVersion"
    $yarnAvailable = $true
} catch {
    Write-Warning "⚠️  yarn chưa được cài đặt (tùy chọn)"
}

Write-Host ""

# Chọn package manager
if ($yarnAvailable) {
    Write-Header "Chọn package manager:"
    Write-Warning "1) npm (mặc định)"
    Write-Warning "2) yarn"
    
    $choice = Read-Host "Nhập lựa chọn (1-2) [1]"
    if ([string]::IsNullOrWhiteSpace($choice)) { $choice = "1" }
    
    if ($choice -eq "2") {
        $packageManager = "yarn"
        $installCmd = "yarn install"
    } else {
        $packageManager = "npm"
        $installCmd = "npm install"
    }
} else {
    $packageManager = "npm"
    $installCmd = "npm install"
}

Write-Success "📦 Sử dụng package manager: $packageManager"
Write-Host ""

# Kiểm tra file package.json
if (-not (Test-Path "package.json")) {
    Write-Error "❌ Không tìm thấy file package.json!"
    Write-Warning "Vui lòng chạy script này từ thư mục gốc của dự án"
    Read-Host "Nhấn Enter để thoát"
    exit 1
}

Write-Success "✅ Tìm thấy file package.json"

# Xóa node_modules và package-lock.json/yarn.lock cũ (nếu có)
Write-Header "🧹 Dọn dẹp các file cũ..."

if (Test-Path "node_modules") {
    Write-Warning "Xóa thư mục node_modules cũ..."
    Remove-Item "node_modules" -Recurse -Force
}

if ($packageManager -eq "npm" -and (Test-Path "yarn.lock")) {
    Write-Warning "Xóa yarn.lock (sử dụng npm)..."
    Remove-Item "yarn.lock" -Force
} elseif ($packageManager -eq "yarn" -and (Test-Path "package-lock.json")) {
    Write-Warning "Xóa package-lock.json (sử dụng yarn)..."
    Remove-Item "package-lock.json" -Force
}

# Cài đặt dependencies
Write-Header "📦 Cài đặt dependencies..."
Write-Warning "Chạy lệnh: $installCmd"
Write-Host ""

try {
    Invoke-Expression $installCmd
    Write-Success "✅ Cài đặt dependencies thành công!"
} catch {
    Write-Error "❌ Lỗi khi cài đặt dependencies!"
    Read-Host "Nhấn Enter để thoát"
    exit 1
}

Write-Host ""

# Kiểm tra các dependency quan trọng
Write-Header "🔍 Kiểm tra các dependency quan trọng..."

$importantDeps = @("next", "react", "react-dom", "typescript", "tailwindcss")

foreach ($dep in $importantDeps) {
    try {
        if ($packageManager -eq "npm") {
            npm list $dep *>$null
            if ($LASTEXITCODE -eq 0) {
                Write-Success "✅ $dep"
            } else {
                Write-Error "❌ $dep không được cài đặt"
            }
        } else {
            yarn list --pattern $dep *>$null
            if ($LASTEXITCODE -eq 0) {
                Write-Success "✅ $dep"
            } else {
                Write-Error "❌ $dep không được cài đặt"
            }
        }
    } catch {
        Write-Error "❌ $dep không được cài đặt"
    }
}

Write-Host ""

# Hiển thị thông tin về các script có sẵn
Write-Header "📋 Các lệnh có sẵn:"
Write-Warning "  • $packageManager run dev    - Chạy development server"
Write-Warning "  • $packageManager run build  - Build production"
Write-Warning "  • $packageManager run start  - Chạy production server"
Write-Warning "  • $packageManager run lint   - Kiểm tra code style"

Write-Host ""

# Hướng dẫn tiếp theo
Write-Success "🎉 Cài đặt hoàn tất!"
Write-Header "Bước tiếp theo:"
Write-Warning "1. Chạy: $packageManager run dev"
Write-Warning "2. Mở trình duyệt tại: http://localhost:3000"

Write-Host ""
Write-Header "==================================="
Write-Header "Happy coding! 🚀"
Write-Header "==================================="

Read-Host "Nhấn Enter để tiếp tục" 