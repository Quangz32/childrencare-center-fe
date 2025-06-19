#!/bin/bash

# Script cài đặt dependencies cho dự án Children Care Frontend
# Hỗ trợ cả npm và yarn

set -e  # Dừng script nếu có lỗi

# Màu sắc cho output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function để in màu
print_color() {
    printf "${1}${2}${NC}\n"
}

print_color $BLUE "==================================="
print_color $BLUE "Children Care Frontend - Setup Script"
print_color $BLUE "==================================="

# Kiểm tra Node.js
if ! command -v node &> /dev/null; then
    print_color $RED "❌ Node.js chưa được cài đặt!"
    print_color $YELLOW "Vui lòng cài đặt Node.js từ: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node --version)
print_color $GREEN "✅ Node.js version: $NODE_VERSION"

# Kiểm tra npm
if ! command -v npm &> /dev/null; then
    print_color $RED "❌ npm chưa được cài đặt!"
    exit 1
fi

NPM_VERSION=$(npm --version)
print_color $GREEN "✅ npm version: $NPM_VERSION"

# Kiểm tra yarn (tùy chọn)
if command -v yarn &> /dev/null; then
    YARN_VERSION=$(yarn --version)
    print_color $GREEN "✅ yarn version: $YARN_VERSION"
    YARN_AVAILABLE=true
else
    print_color $YELLOW "⚠️  yarn chưa được cài đặt (tùy chọn)"
    YARN_AVAILABLE=false
fi

echo ""

# Chọn package manager
if [ "$YARN_AVAILABLE" = true ]; then
    print_color $BLUE "Chọn package manager:"
    print_color $YELLOW "1) npm (mặc định)"
    print_color $YELLOW "2) yarn"
    
    read -p "Nhập lựa chọn (1-2) [1]: " choice
    choice=${choice:-1}
    
    if [ "$choice" = "2" ]; then
        PACKAGE_MANAGER="yarn"
        INSTALL_CMD="yarn install"
    else
        PACKAGE_MANAGER="npm"
        INSTALL_CMD="npm install"
    fi
else
    PACKAGE_MANAGER="npm"
    INSTALL_CMD="npm install"
fi

print_color $GREEN "📦 Sử dụng package manager: $PACKAGE_MANAGER"

echo ""

# Kiểm tra file package.json
if [ ! -f "package.json" ]; then
    print_color $RED "❌ Không tìm thấy file package.json!"
    print_color $YELLOW "Vui lòng chạy script này từ thư mục gốc của dự án"
    exit 1
fi

print_color $GREEN "✅ Tìm thấy file package.json"

# Xóa node_modules và package-lock.json/yarn.lock cũ (nếu có)
print_color $BLUE "🧹 Dọn dẹp các file cũ..."

if [ -d "node_modules" ]; then
    print_color $YELLOW "Xóa thư mục node_modules cũ..."
    rm -rf node_modules
fi

if [ "$PACKAGE_MANAGER" = "npm" ] && [ -f "yarn.lock" ]; then
    print_color $YELLOW "Xóa yarn.lock (sử dụng npm)..."
    rm -f yarn.lock
elif [ "$PACKAGE_MANAGER" = "yarn" ] && [ -f "package-lock.json" ]; then
    print_color $YELLOW "Xóa package-lock.json (sử dụng yarn)..."
    rm -f package-lock.json
fi

# Cài đặt dependencies
print_color $BLUE "📦 Cài đặt dependencies..."
print_color $YELLOW "Chạy lệnh: $INSTALL_CMD"

echo ""

if eval "$INSTALL_CMD"; then
    print_color $GREEN "✅ Cài đặt dependencies thành công!"
else
    print_color $RED "❌ Lỗi khi cài đặt dependencies!"
    exit 1
fi

echo ""

# Kiểm tra các dependency quan trọng
print_color $BLUE "🔍 Kiểm tra các dependency quan trọng..."

IMPORTANT_DEPS=("next" "react" "react-dom" "typescript" "tailwindcss")

for dep in "${IMPORTANT_DEPS[@]}"; do
    if [ "$PACKAGE_MANAGER" = "npm" ]; then
        if npm list "$dep" &> /dev/null; then
            print_color $GREEN "✅ $dep"
        else
            print_color $RED "❌ $dep không được cài đặt"
        fi
    else
        if yarn list --pattern "$dep" &> /dev/null; then
            print_color $GREEN "✅ $dep"
        else
            print_color $RED "❌ $dep không được cài đặt"
        fi
    fi
done

echo ""

# Hiển thị thông tin về các script có sẵn
print_color $BLUE "📋 Các lệnh có sẵn:"
print_color $YELLOW "  • $PACKAGE_MANAGER run dev    - Chạy development server"
print_color $YELLOW "  • $PACKAGE_MANAGER run build  - Build production"
print_color $YELLOW "  • $PACKAGE_MANAGER run start  - Chạy production server"
print_color $YELLOW "  • $PACKAGE_MANAGER run lint   - Kiểm tra code style"

echo ""

# Hướng dẫn tiếp theo
print_color $GREEN "🎉 Cài đặt hoàn tất!"
print_color $BLUE "Bước tiếp theo:"
print_color $YELLOW "1. Chạy: $PACKAGE_MANAGER run dev"
print_color $YELLOW "2. Mở trình duyệt tại: http://localhost:3000"

echo ""
print_color $BLUE "==================================="
print_color $BLUE "Happy coding! 🚀"
print_color $BLUE "===================================" 