# 🚗 CarryGo

> **Ride-Sharing Application** | Built for the Interswitch Innovation Competition

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-20232A?style=flat&logo=react&logoColor=61DAFB)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat&logo=springboot&logoColor=white)
![Java](https://img.shields.io/badge/Java-ED8B00?style=flat&logo=openjdk&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)

---

## 📋 Table of Contents

- [About](#-about)
- [✨ Features](#-features)
- [🏗️ Project Structure](#-project-structure)
- [🛠️ Tech Stack](#-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [🔌 API Endpoints](#-api-endpoints)
- [🤝 Contributing](#-contributing)
- [👥 Team](#-team)
- [📄 License](#-license)

---

## 🎯 About

**CarryGo** is a full-stack ride-sharing mobile application developed for the **Interswitch Innovation Competition**. The platform connects commuters with verified drivers for safe, efficient, and affordable transportation within urban areas.

The application supports two user roles:
- 🚕 **Drivers**: Accept ride requests, manage earnings, track trips
- 🚶 **Commuters**: Book rides, track drivers in real-time, manage payments

---

## ✨ Features

### 🔐 Authentication & Onboarding
- Phone number verification with OTP
- Role selection (Driver/Commuter)
- Multi-step profile setup
- Document upload for identity verification (Driver's License, Vehicle Registration, National ID, etc.)

### 🗺️ Core Functionality
- **Live Traffic Map**: Real-time location tracking with map integration
- **Ride Booking**: Seamless request and matching system
- **Driver Dashboard**: Manage availability, view incoming requests, trip history
- **Wallet System**: In-app payment processing and transaction history
- **Route Optimization**: Efficient path calculation for pickups and drop-offs

### 🛡️ Security
- JWT-based authentication
- Secure document storage
- Role-based access control (RBAC)
- Input validation and sanitization

---

## 🏗️ Project Structure

```
CarryGo/
├── Backend/                    # Spring Boot Java API
│   ├── src/main/java/         # Application source code
│   ├── src/main/resources/    # Configuration & properties
│   ├── Dockerfile             # Containerization config
│   ├── docker-compose.yaml    # Multi-container orchestration
│   ├── pom.xml                # Maven dependencies
│   └── README.md              # Backend documentation
│
├── UI/                         # Expo React Native Mobile App
│   ├── app/                   # File-based routing (Expo Router)
│   ├── components/            # Reusable UI components
│   ├── contexts/              # React Context providers
│   ├── hooks/                 # Custom React hooks
│   ├── types/                 # TypeScript interfaces
│   ├── utils/                 # Helper functions
│   ├── api_contract.md        # API specification
│   ├── package.json           # Node dependencies
│   └── README.md              # Frontend documentation
│
├── README.md                  # Project root documentation
└── .gitignore                 # Git ignore rules
```

---

## 🛠️ Tech Stack

### 📱 Frontend (Mobile UI)
| Technology | Purpose |
|------------|---------|
| **Expo SDK 55** | React Native development framework |
| **React Native 0.83** | Cross-platform mobile UI |
| **TypeScript** | Type-safe JavaScript |
| **Expo Router** | File-based navigation |
| **React Navigation** | Screen navigation & transitions |
| **React Query** | Server state management & caching |
| **Axios** | HTTP client for API calls |
| **Zod** | Runtime schema validation |
| **Zustand** | Lightweight state management |
| **Expo Modules** | Camera, Image Picker, Secure Store, SQLite, etc. |

### ⚙️ Backend (API Server)
| Technology | Purpose |
|------------|---------|
| **Spring Boot 4.1.0-M3** | Enterprise Java framework |
| **Spring Security** | Authentication & authorization |
| **Spring Data JPA** | Database abstraction layer |
| **PostgreSQL** | Relational database |
| **JWT (jjwt)** | Stateless token authentication |
| **Lombok** | Boilerplate code reduction |
| **MapStruct** | Object mapping utility |
| **Spring Validation** | Request data validation |

### 🐳 DevOps & Infrastructure
| Tool | Purpose |
|------|---------|
| **Docker** | Containerization |
| **Docker Compose** | Multi-service orchestration |
| **Maven** | Java dependency & build management |
| **Expo EAS** | Mobile app build & distribution |

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18.x
- Java JDK 17+
- Maven 3.8+
- Docker & Docker Compose (optional)
- Expo Go app (for mobile testing)

### 🔧 Backend Setup

```bash
cd Backend

# Install dependencies
mvn clean install

# Configure environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run with PostgreSQL (requires Docker)
docker-compose up -d

# Start the application
mvn spring-boot:run

# Server will be available at: http://localhost:8080
```

### 📱 Frontend Setup

```bash
cd UI

# Install dependencies
npm install

# Start development server
npx expo start

# Options:
# - Press 'a' for Android emulator
# - Press 'i' for iOS simulator  
# - Press 'w' for web browser
# - Scan QR code with Expo Go app on physical device
```

### 🔑 Environment Variables

**Backend (.env)**
```env
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/carrygo
SPRING_DATASOURCE_USERNAME=your_username
SPRING_DATASOURCE_PASSWORD=your_password
JWT_SECRET=your_secure_jwt_secret
```

**Frontend (app.config.js / eas.json)**
```env
EXPO_PUBLIC_API_BASE_URL=http://localhost:8080/api/v1
```

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/v1/auth/phone` | Send OTP to phone number |
| `POST` | `/v1/auth/verify` | Verify OTP and login/signup |

### User Onboarding
| Method | Endpoint | Description |
|--------|----------|-------------|
| `PATCH` | `/v1/user/role` | Assign user role (driver/commuter) |
| `PATCH` | `/v1/user/profile` | Update profile information |
| `POST` | `/v1/user/verify-identity` | Upload identity verification documents |

### Sample Request: Phone Verification
```http
POST /v1/auth/phone
Content-Type: application/json

{
  "phone": "+2348012345678"
}
```

### Sample Response
```json
{
  "message": "OTP sent successfully"
}
```

> 📄 Full API contract documentation: [`UI/api_contract.md`](./UI/api_contract.md)

---

## 🤝 Contributing

We welcome contributions from the community! To contribute:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feat/your-feature-name`
3. **Commit** your changes: `git commit -m 'feat: add your feature'`
4. **Push** to the branch: `git push origin feat/your-feature-name`
5. **Open** a Pull Request

### Contribution Guidelines
- Follow the existing code style (ESLint/Prettier for frontend, Spring conventions for backend)
- Write meaningful commit messages using [Conventional Commits](https://www.conventionalcommits.org/)
- Update documentation for new features or changes
- Add tests for new functionality where applicable

---

## 👥 Team

| Name | Role | Responsibilities |
|------|------|-----------------|
| **Abubakar Usman Damilare** | 🎨 UI/UX Designer | User interface design, user experience flow, wireframes, visual assets |
| **Abdulrasheed AbdulSalam** | 📱 Mobile Engineer | React Native development, Expo integration, mobile architecture, state management |
| **Nurudeen Abdulmalik** | ⚙️ Backend Engineer | Spring Boot API development, database design, authentication, security implementation |
| **Elewade Abdulrauf** | 📋 Project Manager | Sprint planning, task coordination, stakeholder communication, delivery oversight |

> 💡 *This project was developed collaboratively for the Interswitch Innovation Competition.*

---

## 📄 License

This project is proprietary and developed for competition purposes.  
© 2026 CarryGo Team. All rights reserved.

---

## 🙏 Acknowledgements

- **Interswitch Group** for organizing the innovation competition
- **Expo** and **React Native** communities for excellent developer tools
- **Spring.io** for robust backend framework support

---

> ⚠️ **Disclaimer**: This application is a competition prototype. Features, APIs, and architecture are subject to change. Not intended for production use without further development and security auditing.

---

*Built with ❤️ by the CarryGo Team* 🚀
