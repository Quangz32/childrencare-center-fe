# 🚀 Hướng dẫn cài đặt Dependencies - Children Care Frontend

## 📋 Tổng quan

Dự án này cung cấp 3 script tự động để cài đặt dependencies một cách dễ dàng cho các hệ điều hành khác nhau:

- **Linux/macOS**: `install-dependencies.sh`
- **Windows (Batch)**: `install-dependencies.bat`
- **Windows (PowerShell)**: `install-dependencies.ps1`

## 🔧 Yêu cầu hệ thống

### Bắt buộc:

- **Node.js** (phiên bản 18 trở lên) - [Tải tại đây](https://nodejs.org/)
- **npm** (đi kèm với Node.js)

### Tùy chọn:

- **yarn** - Package manager thay thế cho npm

## 🖥️ Hướng dẫn sử dụng

### Linux / macOS

1. Mở Terminal trong thư mục dự án
2. Cấp quyền thực thi cho script:
   ```bash
   chmod +x install-dependencies.sh
   ```
3. Chạy script:
   ```bash
   ./install-dependencies.sh
   ```

### Windows (Command Prompt)

1. Mở Command Prompt trong thư mục dự án
2. Chạy script:
   ```cmd
   install-dependencies.bat
   ```

### Windows (PowerShell)

1. Mở PowerShell trong thư mục dự án
2. Nếu gặp lỗi execution policy, chạy lệnh sau trước:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
3. Chạy script:
   ```powershell
   .\install-dependencies.ps1
   ```

## ✨ Tính năng của script

### 🔍 Kiểm tra môi trường

- ✅ Kiểm tra Node.js đã được cài đặt
- ✅ Kiểm tra npm có sẵn
- ✅ Phát hiện yarn (nếu có)
- ✅ Hiển thị phiên bản các công cụ

### ⚙️ Lựa chọn Package Manager

- 📦 Hỗ trợ cả npm và yarn
- 🎯 Tự động phát hiện yarn nếu có sẵn
- 🔄 Cho phép người dùng chọn lựa

### 🧹 Dọn dẹp tự động

- 🗑️ Xóa `node_modules` cũ
- 🗑️ Xóa `package-lock.json` hoặc `yarn.lock` không phù hợp
- 🔄 Đảm bảo cài đặt sạch sẽ

### 📦 Cài đặt Dependencies

- ⚡ Cài đặt tất cả dependencies từ `package.json`
- ✅ Kiểm tra tình trạng cài đặt
- 🎯 Verify các package quan trọng

### 📋 Hướng dẫn tiếp theo

- 🎮 Hiển thị các lệnh có sẵn
- 🚀 Hướng dẫn khởi chạy development server

## 📦 Dependencies chính của dự án

### Runtime Dependencies:

- **Next.js 15.1.8** - React framework
- **React 19.0.0** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 3.4.1** - Styling framework
- **Mongoose 8.16.0** - MongoDB ODM
- **Axios 1.10.0** - HTTP client
- **JWT libraries** - Authentication
- **Google Generative AI** - AI integration
- **Cloudinary** - Image management
- **Lucide React** - Icons

### Development Dependencies:

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **TypeScript types** - Type definitions

## 🎯 Các lệnh sau khi cài đặt

```bash
# Chạy development server
npm run dev
# hoặc
yarn dev

# Build production
npm run build
# hoặc
yarn build

# Chạy production server
npm run start
# hoặc
yarn start

# Kiểm tra code style
npm run lint
# hoặc
yarn lint
```

## 🌐 Truy cập ứng dụng

Sau khi chạy `npm run dev` hoặc `yarn dev`, mở trình duyệt tại:
**http://localhost:3000**

## 🐛 Xử lý sự cố

### Lỗi permission (Linux/macOS):

```bash
sudo chmod +x install-dependencies.sh
```

### Lỗi execution policy (Windows PowerShell):

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Lỗi Node.js không tìm thấy:

- Cài đặt Node.js từ: https://nodejs.org/
- Khởi động lại terminal/command prompt
- Kiểm tra với: `node --version`

### Lỗi npm không hoạt động:

- Node.js mới nhất đã bao gồm npm
- Cập nhật npm: `npm install -g npm@latest`

## 🤝 Hỗ trợ

Nếu gặp vấn đề khi sử dụng script, vui lòng:

1. Kiểm tra Node.js đã được cài đặt đúng cách
2. Đảm bảo đang chạy script từ thư mục gốc của dự án
3. Thử xóa `node_modules` và chạy lại script

---

**Happy coding! 🚀**
