# CodeCollab Backend

Spring Boot backend for real-time collaborative coding platform.

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+

## Setup

### 1. Database Setup

Create a MySQL database:
```sql
CREATE DATABASE codecollab;
```

### 2. Configure Database

Update `src/main/resources/application.yml` with your MySQL credentials:
```yaml
datasource:
  username: your_username
  password: your_password
```

### 3. Build & Run

```bash
# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The server will start on `http://localhost:8080`

## API Endpoints

### Health Check
- `GET /` - Welcome message
- `GET /api/health` - Health status

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Rooms
- `GET /api/rooms` - Get user's rooms
- `POST /api/rooms` - Create new room
- `POST /api/rooms/join` - Join room with invite code
- `GET /api/rooms/{roomId}` - Get room details

### Files
- `GET /api/files/room/{roomId}` - Get file tree
- `POST /api/files/room/{roomId}` - Create file/folder
- `PUT /api/files/{fileId}` - Update file content
- `DELETE /api/files/{fileId}` - Delete file

## WebSocket

Connect to WebSocket at: `ws://localhost:8080/ws`

## Testing

Test the API:
```bash
curl http://localhost:8080/api/health
```

Register a user:
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"password123"}'
```

## Frontend Connection

The backend is configured to accept requests from:
- `http://localhost:5173` (Vite)
- `http://localhost:3000` (React dev server)

CORS and WebSocket are already configured for frontend integration.
