# Environment Setup Guide

## Environment Variables Required

Tạo file `.env.local` trong root directory với các biến sau:

```bash
# Database
MONGODB_URI=mongodb://localhost:27017/children-care
# Hoặc MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/children-care

# JWT Secret Key (sử dụng string dài và random)
JWT_SECRET=your_super_secret_jwt_key_here_should_be_very_long_and_random

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Development Settings (optional)
NODE_ENV=development
SKIP_AUTH=false  # Set to true để skip authentication trong development
```

## Cấu hình Cloudinary

1. Đăng ký tài khoản tại [Cloudinary](https://cloudinary.com/)
2. Lấy thông tin từ Dashboard:
   - Cloud Name
   - API Key
   - API Secret
3. Thêm vào file `.env.local`

## Cấu hình MongoDB

### Option 1: MongoDB Local

1. Cài đặt MongoDB locally
2. Sử dụng connection string: `mongodb://localhost:27017/children-care`

### Option 2: MongoDB Atlas (Recommended)

1. Tạo cluster tại [MongoDB Atlas](https://cloud.mongodb.com/)
2. Tạo database user
3. Whitelist IP address
4. Lấy connection string và thay thế password

## JWT Secret

Tạo JWT secret bằng cách:

```bash
# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# OpenSSL
openssl rand -hex 32

# Online generator
# Hoặc sử dụng online generator để tạo string random dài
```

## Development Mode

Để skip authentication trong development (chỉ để test):

```bash
NODE_ENV=development
SKIP_AUTH=true
```

**Lưu ý**: Đừng bao giờ set `SKIP_AUTH=true` trong production!
