# 🚀 CodeCollab - Real-Time Collaborative Coding Platform

A full-stack web application for real-time collaborative coding with integrated chat, file management, and room-based workspaces.

## ✨ Features

- 🔐 **JWT Authentication** - Secure user registration and login
- 👥 **Room-Based Collaboration** - Create and join coding rooms with invite codes
- 📁 **File Management** - Create, edit, and organize files in a tree structure
- 💬 **In-Room Chat** - Real-time messaging via WebSocket
- 👁️ **User Presence** - See who's online in your room
- 🎨 **Modern UI** - Dark/light theme with smooth animations

## 🛠️ Tech Stack

### Backend
- **Spring Boot 3.4.1** - Java framework
- **MySQL** - Database
- **JWT** - Authentication
- **WebSocket** - Real-time communication
- **Lombok** - Boilerplate reduction

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Animations
- **Axios** - HTTP client

## 📋 Prerequisites

- Java 17+ (JDK 23 installed)
- MySQL 8.0+
- Node.js 18+
- npm or yarn

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd code-collab
```

### 2. Setup MySQL Database
```sql
CREATE DATABASE codecollab;
```

### 3. Configure Backend
The backend is already configured to use:
- **Port:** 8085
- **Database:** codecollab
- **Username:** root
- **Password:** shubham

Edit `backend/src/main/resources/application.yml` if you need different credentials.

### 4. Run Backend
```powershell
cd backend
$env:JAVA_HOME = "C:\Program Files\Java\jdk-23"
java -jar target\codecollab-0.0.1-SNAPSHOT.jar
```

Backend will start on: **http://localhost:8085**

### 5. Install Frontend Dependencies
```bash
cd frontend
npm install
```

### 6. Run Frontend
```bash
npm run dev
```

Frontend will start on: **http://localhost:5173**

## 🧪 Testing the API

### Health Check
```powershell
Invoke-RestMethod -Uri http://localhost:8085/api/health
```

Expected response:
```json
{
  "status": "UP",
  "service": "CodeCollab API"
}
```

### Register User (PowerShell)
```powershell
$body = @{
    username = "testuser"
    email = "test@example.com"
    password = "password123"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:8085/api/auth/register `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```

### Login (PowerShell)
```powershell
$body = @{
    username = "testuser"
    password = "password123"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:8085/api/auth/login `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Rooms
- `POST /api/rooms` - Create new room
- `POST /api/rooms/join` - Join room with invite code
- `GET /api/rooms` - Get user's rooms
- `GET /api/rooms/{id}` - Get room details

### Files
- `GET /api/files/room/{roomId}` - Get file tree
- `POST /api/files/room/{roomId}` - Create file/folder
- `PUT /api/files/{fileId}` - Update file content
- `DELETE /api/files/{fileId}` - Delete file

### Health
- `GET /api/health` - API health check

## 🏗️ Project Structure

```
code-collab/
├── backend/
│   ├── src/main/java/com/codecollab/
│   │   ├── controller/          # REST API endpoints
│   │   ├── service/             # Business logic
│   │   ├── entity/              # JPA entities
│   │   ├── repository/          # Data access layer
│   │   ├── security/            # JWT & authentication
│   │   ├── config/              # Spring configuration
│   │   └── dto/                 # Data transfer objects
│   └── src/main/resources/
│       └── application.yml      # App configuration
│
└── frontend/
    ├── src/
    │   ├── services/            # API integration
    │   │   └── api.ts
    │   ├── types/               # TypeScript types
    │   │   └── index.ts
    │   ├── App.tsx              # Landing page
    │   └── main.tsx             # Entry point
    └── package.json
```

## 🔒 Security

- JWT-based authentication
- Password hashing with BCrypt
- CORS configured for localhost development
- Secure HTTP-only token storage

## 🐛 Troubleshooting

### Backend Issues

**Port 8085 already in use:**
```powershell
netstat -ano | findstr :8085
taskkill /PID <PID> /F
```

**MySQL connection failed:**
- Ensure MySQL is running
- Verify credentials in application.yml
- Check database `codecollab` exists

**Build failed:**
```powershell
cd backend
.\mvnw.cmd clean install -DskipTests
```

### Frontend Issues

**Dependencies not installed:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

**Port 5173 already in use:**
Edit `vite.config.ts` to use a different port.

## 📝 Next Development Steps

1. **Authentication UI** - Build login and register pages
2. **Dashboard** - Room list and management interface
3. **Collaborative Editor** - Integrate Monaco or CodeMirror
4. **Real-time Sync** - WebSocket integration for live coding
5. **Chat UI** - In-room messaging interface
6. **User Profiles** - Avatar, settings, preferences

## 📚 Documentation

- [Integration Guide](./INTEGRATION_GUIDE.md) - API integration examples
- [Backend API Details](./backend/) - Controller documentation
- [Frontend Components](./frontend/) - Component documentation

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- React team for the powerful UI library
- All open-source contributors

---

**Built with ❤️ for collaborative coding**
