# 📚 naijaEdu – AI-Powered Learning for Nigerian Students 🇳🇬

**naijaEdu** is a full-stack AI-powered learning platform designed to help Nigerian students understand complex academic topics with ease. Using Google Gemini, the platform provides simplified explanations, voice playback via text-to-speech, and instantly generated quiz questions—all within an intuitive chat interface.

With Google login, gamification (confetti celebrations), and shareable content, **naijaEdu** makes studying smarter and more engaging.

---

## 🌐 Live Demo

* 🔗 **App**: [naijaedu.vercel.app](https://naijaedu.vercel.app)
* 📘 **API Docs (Swagger)**: [naijaedu.onrender.com/api-docs](https://naijaedu.onrender.com/api-docs)

---

## 🚀 Features

| Feature                        | Description                                                            |
| ------------------------------ | ---------------------------------------------------------------------- |
| 🧠 **AI-Powered Explanations** | Enter any topic and get a simplified explanation via Google Gemini.    |
| 🔊 **Text-to-Speech (TTS)**    | Listen to topic explanations for auditory learning and accessibility.  |
| 🎯 **Auto Quiz Generator**     | Generate multiple-choice quizzes based on the explained topic.         |
| 🎉 **Gamified Experience**     | Celebrate quiz success with confetti animations and friendly feedback. |
| 🔐 **Authentication**          | Sign in using Google or email/password (Auth).                |
| 📤 **Shareable Content**       | Share AI-generated explanations with friends or on social media.       |

---

## 🧑‍💻 Tech Stack

### 🖼️ Frontend

* React + TypeScript
* Vite
* Axios
* CSS
* Firebase Auth (Google login)

### 🔧 Backend

* Node.js + Express (TypeScript)
* MongoDB + Mongoose
* Google Gemini API (`@google/genai`)
* Swagger UI for API documentation
* JWT for secure authentication
* Helmet, CORS, Morgan for security/logging

---

## 🧠 Architecture Overview

```mermaid
graph TD
A[Frontend (React)] -->|REST API| B[Backend (Express/Node.js)]
B --> C[Google Gemini API]
B --> D[MongoDB]
A --> E[Auth]
A --> F[TTS (Web Speech API)]
```

> 🧩 Users interact with the React frontend → Backend sends topic prompts to Gemini → Stores data in MongoDB → Frontend renders explanation, reads it aloud (TTS), and generates a quiz.

---

## 🖼️ UI Previews

| Screen                   | Preview                                                          |
| ------------------------ | ---------------------------------------------------------------- |
| Homepage                 | ![](./frontend/screenshots/homepage.png)                                  |
| Chat Interface           | ![](./frontend/screenshots/Screenshot%20from%202025-07-24%2014-40-32.png) |
| AI Generated Explanation | ![](./frontend/screenshots/Screenshot%20from%202025-07-24%2014-40-52.png) |
| Quiz Page                | ![](./frontend/screenshots/quiz.png)                                      |

---

## 🧰 Getting Started

### 1️⃣ Clone the Repo

```bash
git clone https://github.com/talk2dennis/naijaedu.git
cd naijaedu
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` in `/backend`:

```env
PORT=5000
JWT_SECRET=your_jwt_secret
MONGO_URI=your_mongodb_connection_string
CORS_ORIGIN=http://localhost:5173
GEMINI_API_KEY=your_google_genai_key
```

Run the backend:

```bash
npm run dev
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` in `/frontend`:

```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_API_BASE_URL=http://localhost:5000
```

Run the frontend:

```bash
npm run dev
```

---

## 🔗 API Documentation

* 🧪 Local Swagger: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)
* 🌐 Live Swagger: [naijaedu.onrender.com/api-docs](https://naijaedu.onrender.com/api-docs)

---

## 📽️ Demo Video

🎥 [Watch the Live Demo](https://www.linkedin.com/posts/talk2dennis_naijaedu-3mmt-knowledgeshowcase-activity-7351725128436637697-wWkJ?utm_source=share&utm_medium=member_desktop&rcm=ACoAABdbbuAB4ddVF5l7FsFgL90cpOQdQ3KB29Y)

> ✨ See how a student goes from topic confusion to quiz mastery in seconds!

---

## 🎯 Ideal For

* WAEC/NECO/UTME exam prep
* Teachers and peer educators
* Education hackathons and AI showcases
* Self-paced learners in Nigeria and across Africa

---

## ☁️ Deployment

| Component | Platform | Link                                                   |
| --------- | -------- | ------------------------------------------------------ |
| Frontend  | Vercel   | [naijaedu.vercel.app](https://naijaedu.vercel.app)     |
| Backend   | Render   | [naijaedu.onrender.com](https://naijaedu.onrender.com) |

---

## 🤝 Contributing

Contributions are welcome! Please see [`CONTRIBUTING.md`](./CONTRIBUTING.md) for setup and best practices.

---

## 📄 License

MIT License © 2025 [Dennis Adigwe](https://github.com/talk2dennis)
🔗 [Connect on LinkedIn](https://www.linkedin.com/in/talk2dennis)
