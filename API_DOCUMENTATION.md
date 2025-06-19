# API Documentation - Children Care Application

## Tổng quan

Tất cả API đã được chuyển từ Pages Router sang App Router. Các API đều sử dụng JWT authentication thông qua middleware.

## Authentication

Tất cả API (trừ public routes) đều yêu cầu JWT token trong header:

```
Authorization: Bearer <your_jwt_token>
```

## Public Routes (không cần authentication)

- `POST /api/auth/login` - Đăng nhập
- `POST /api/users` - Đăng ký user mới
- `GET /api/hello` - Health check
- `POST /api/upload` - Upload ảnh đơn lẻ

## Authentication API

### POST /api/auth/login

Đăng nhập user

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "accessToken": "jwt_token",
  "refreshToken": "refresh_token",
  "user": {
    "_id": "user_id",
    "email": "user@example.com",
    "fullName": "User Name",
    "role": "parent"
  }
}
```

## Users API

### GET /api/users

Lấy danh sách tất cả users (cần authentication)

**Response:**

```json
{
  "users": [
    {
      "_id": "user_id",
      "email": "user@example.com",
      "fullName": "User Name",
      "role": "parent",
      "gender": "male",
      "address": "User Address"
    }
  ]
}
```

### POST /api/users

Tạo user mới (không cần authentication)

**Request Body:**

```json
{
  "email": "user@example.com",
  "phone": "0123456789",
  "password": "password123",
  "fullName": "User Name",
  "gender": "male",
  "address": "User Address",
  "role": "parent"
}
```

### GET /api/users/[id]

Lấy thông tin user theo ID (cần authentication)

**Response:**

```json
{
  "user": {
    "_id": "user_id",
    "email": "user@example.com",
    "fullName": "User Name",
    "role": "parent"
  }
}
```

### PUT /api/users/[id]

Cập nhật thông tin user (cần authentication)

**Request Body:**

```json
{
  "fullName": "New Name",
  "gender": "female",
  "address": "New Address"
}
```

## Memories API

### GET /api/memories

Lấy tất cả memories của user hiện tại (cần authentication)

**Response:**

```json
{
  "allMemories": [
    {
      "_id": "memory_id",
      "user": "user_id",
      "title": "Memory Title",
      "content": "Memory Content",
      "date": "2023-12-01T00:00:00.000Z",
      "image": "https://cloudinary.com/image.jpg"
    }
  ]
}
```

### POST /api/memories

Tạo memory mới với upload ảnh (cần authentication)

**Request (FormData):**

- `title` (string): Tiêu đề memory
- `content` (string): Nội dung memory
- `date` (string): Ngày tháng (ISO format)
- `image` (File): File ảnh (jpg, png, gif, max 10MB)

**Response:**

```json
{
  "memory": {
    "_id": "memory_id",
    "user": "user_id",
    "title": "Memory Title",
    "content": "Memory Content",
    "date": "2023-12-01T00:00:00.000Z",
    "image": "https://cloudinary.com/uploaded-image.jpg"
  },
  "imageData": {
    "url": "https://cloudinary.com/uploaded-image.jpg",
    "public_id": "memories/memory_user_id_timestamp"
  }
}
```

### GET /api/memories/[id]

Lấy memory theo ID (cần authentication)

**Response:**

```json
{
  "memory": {
    "_id": "memory_id",
    "user": "user_id",
    "title": "Memory Title",
    "content": "Memory Content",
    "date": "2023-12-01T00:00:00.000Z",
    "image": "https://cloudinary.com/image.jpg"
  }
}
```

### PUT /api/memories/[id]

Cập nhật memory (cần authentication, chỉ owner mới được update)

**Request (FormData):**

- `title` (string, optional): Tiêu đề mới
- `content` (string, optional): Nội dung mới
- `date` (string, optional): Ngày tháng mới (ISO format)
- `image` (File, optional): File ảnh mới (sẽ thay thế ảnh cũ)

**Response:**

```json
{
  "memory": {
    "_id": "memory_id",
    "user": "user_id",
    "title": "Updated Title",
    "content": "Updated Content",
    "date": "2023-12-01T00:00:00.000Z",
    "image": "https://cloudinary.com/new-image.jpg"
  }
}
```

### DELETE /api/memories/[id]

Xóa memory (cần authentication, chỉ owner mới được xóa)

**Response:**

```json
{
  "message": "Memory deleted successfully"
}
```

### GET /api/memories/user

Lấy memories của user với phân trang (cần authentication)

**Query Parameters:**

- `page` (number, default: 1): Trang hiện tại
- `limit` (number, default: 10): Số lượng items per page
- `sortBy` (string, default: "date"): Trường để sort
- `sortOrder` (string, default: "desc"): Thứ tự sort (asc/desc)

**Response:**

```json
{
  "memories": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalCount": 45,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

## Upload API

### POST /api/upload

Upload ảnh đơn lẻ lên Cloudinary (không cần authentication)

**Request (FormData):**

- `file` (File): File ảnh cần upload

**Response:**

```json
{
  "success": true,
  "data": {
    "public_id": "children-care/image_id",
    "secure_url": "https://cloudinary.com/image.jpg",
    "width": 1920,
    "height": 1080,
    "format": "jpg",
    "resource_type": "image",
    "created_at": "2023-12-01T00:00:00Z",
    "bytes": 123456
  }
}
```

## Error Responses

Tất cả API đều trả về error responses theo format:

```json
{
  "message": "Error description"
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Ví dụ sử dụng

### Tạo Memory với ảnh bằng JavaScript

```javascript
const formData = new FormData();
formData.append("title", "My Memory");
formData.append("content", "This is my memory content");
formData.append("date", new Date().toISOString());
formData.append("image", imageFile); // imageFile là File object

const response = await fetch("/api/memories", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
  },
  body: formData,
});

const result = await response.json();
```

### Lấy memories với phân trang

```javascript
const response = await fetch(
  "/api/memories/user?page=1&limit=5&sortBy=date&sortOrder=desc",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

const result = await response.json();
```
