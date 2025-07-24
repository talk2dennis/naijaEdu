# 📚 naijaEdu Backend API

A backend service leveraging **Gemini (Google GenAI)** to generate concise explanations and multiple-choice quizzes for any topic. Tailored for Nigerian students, it delivers clear, relatable educational content.

---

## 📚 Table of Contents

- [📚 naijaEdu Backend API](#-naijaedu-backend-api)
  - [📚 Table of Contents](#-table-of-contents)
  - [🛠️ Technologies Used](#️-technologies-used)
  - [🚀 Features](#-features)
  - [⚙️ Tech Stack](#️-tech-stack)
  - [🧰 Getting Started](#-getting-started)
    - [📦 Installation](#-installation)
    - [⚙️ Environment Variables](#️-environment-variables)
    - [▶️ Running Locally](#️-running-locally)
  - [📑 API Documentation](#-api-documentation)
  - [🔐 Authentication](#-authentication)
  - [📦 Routes](#-routes)
    - [🔑 Auth Routes](#-auth-routes)
    - [👥 User Routes](#-user-routes)
    - [📚 Learning Routes](#-learning-routes)
      - [Example Quiz Response](#example-quiz-response)
  - [🚀 Deployment](#-deployment)
  - [📄 License](#-license)

---

## 🛠️ Technologies Used

- Node.js
- TypeScript
- MongoDB & Mongoose
- Gemini API (`@google/genai`)
- Axios

---

## 🚀 Features

- 🔐 JWT Authentication (Register, Login, Current User)
- 👤 User Management (Profile, Update, Delete)
- 📚 Course Management (CRUD operations)
- 🎓 Course Enrollment/Unenrollment
- 📄 Swagger UI for API docs
- 🛡️ Security: Helmet & CORS
- 📝 Request validation middleware
- 📘 AI-generated topic explanations (Gemini)
- ❓ AI-generated 3-question multiple-choice quizzes
- 💾 Content & quiz persistence in MongoDB
- 🌍 Nigerian learner-focused design

---

## ⚙️ Tech Stack

- **Node.js**
- **Express**
- **TypeScript**
- **JWT (JSON Web Tokens)**
- **Swagger (OpenAPI 3.1)**
- **Mongoose / MongoDB**
- **Helmet, CORS, Morgan**
- **Gemini API (`@google/genai`)**

---

## 🧰 Getting Started

### 📦 Installation

```bash
git clone https://github.com/talk2dennis/naijaedu.git
cd naijaedu-backend
npm install
```

### ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret
MONGO_URI=your_mongodb_connection_string
CORS_ORIGIN=http://localhost:3000
GEMINI_API_KEY=your_google_genai_key
```

### ▶️ Running Locally

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

---

## 📑 API Documentation

Access Swagger UI:

- **Local**: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)
- **Production**: [https://naijaedu.onrender.com/api-docs](https://naijaedu.onrender.com/api-docs)

Use the **Authorize** button to provide your JWT token for protected endpoints.

---

## 🔐 Authentication

naijaEdu uses JWT authentication. To access protected routes:

1. Register or log in to receive a token.
2. Add the token to your requests:

```http
Authorization: Bearer <your_token>
```

---

## 📦 Routes

### 🔑 Auth Routes

| Method | Endpoint             | Description                   |
|--------|----------------------|-------------------------------|
| POST   | `/api/auth/register` | Register a new user           |
| POST   | `/api/auth/login`    | Log in and receive a token    |
| GET    | `/api/auth/me`       | Get current user profile      |

---

### 👥 User Routes

**Base URL**: `/api/users`

| Method | Endpoint      | Description                 |
|--------|--------------|-----------------------------|
| GET    | `/`          | Get all users (protected)   |
| GET    | `/:id`       | Get user by ID              |
| PUT    | `/:id`       | Update user by ID           |
| DELETE | `/:id`       | Delete user by ID           |

---

### 📚 Learning Routes

**Base URL**: `/api/ai`

| Method | Endpoint                   | Description                                 |
|--------|----------------------------|---------------------------------------------|
| POST   | `/generate-explanation`    | Generate explanation for a topic (Gemini)   |
| POST   | `/generate-quiz/:contentId`| Generate quiz based on explanation content  |
| GET    | `/user-content`            | Get all user-generated content              |

---

#### Example Quiz Response

```json
[
  {
    "question": "What is the center of the Solar System?",
    "options": [
      "A. Earth",
      "B. The Sun",
      "C. The Moon",
      "D. Mars"
    ],
    "correctAnswer": "B"
  }
]
```

---

## 🚀 Deployment

Deployed on **Render.com**.

- Base URL: `https://naijaedu.onrender.com`
- API Docs: [https://naijaedu.onrender.com/api-docs](https://naijaedu.onrender.com/api-docs)

Ensure your Swagger server URL matches production:

```ts
servers: [
  {
    url: "https://naijaedu.onrender.com",
  },
]
```

---

## 📄 License
MIT License © 2025 [Dennis Adigwe](https://github.com/talk2dennis)  
Connect on [LinkedIn](https://www.linkedin.com/in/talk2dennis)

