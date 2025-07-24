# 📚 naijaEdu – AI-Powered Learning for Nigerian Students

**naijaEdu** is a full-stack AI-driven learning platform that helps Nigerian students understand complex topics in simple terms. Powered by Google Gemini, the app explains any topic, reads it out loud, and generates quiz questions to reinforce learning all through an intuitive chat interface.

With Google sign-in, voice playback, and confetti-based gamification, naijaEdu makes studying smarter and more engaging.

---

## 🌍 Live Demo

* 🧠 App: [https://naijaedu.vercel.app](https://naijaedu.vercel.app)
* 🛠️ API Docs (Swagger): [https://naijaedu.onrender.com/api-docs](https://naijaedu.onrender.com/api-docs)

---

## 🚀 Key Features

### 🧠 AI Learning Assistant

* Input any topic and receive a simplified explanation via the Gemini API.

### 🔊 Text-to-Speech (TTS)

* Explanations can be played aloud for accessibility and ease of comprehension.

### 🎯 Auto Quiz Generator

* Instantly generate multiple-choice quizzes from topic content.

### 🎉 Gamified UX

* Confetti animation celebrates successful quiz attempts.

### 🔐 Authentication

* Supports Google sign-in and email/password login.

### 📤 Shareable Content

* Share explanations directly to social platforms.

---

## 🧑‍💻 Tech Stack

### Frontend

* React + TypeScript
* CSS
* Axios for API calls
* Google Auth
* Vite

### Backend

* Node.js + Express
* TypeScript
* MongoDB + Mongoose for database
* Google Gemini API (`@google/genai`)
* Swagger UI for API documentation
* JWT for authentication
* Helmet, CORS, and Morgan for security/logging

---

## 📸 Preview

<img src="/frontend/screenshots/homepage.png" alt="Homepage Screenshot" width="600px" />
<br/>
*Homepage UI*

<img src="/frontend/screenshots/Screenshot%20from%202025-07-24%2014-40-32.png" alt="Chatpage Screenshot" width="600px" />
<br/>
*Chatpage UI – chat interface with AI responses*

<img src="/frontend/screenshots/Screenshot%20from%202025-07-24%2014-40-52.png" alt="Chatpage Screenshot" width="600px" />
<br/>
*Chatpage with AI generated contents*

<img src="/frontend/screenshots/quiz.png" alt="Quiz Screenshot" width="600px" />
<br/>
*Auto-generated quiz with confetti celebration*

<img src="/frontend/screenshots/Screenshot%20from%202025-07-24%2015-05-02.png" alt="Quiz Screenshot" width="600px" />
<br/>
*Swagger page*

<img src="/frontend/screenshots/Screenshot%20from%202025-07-24%2015-05-10.png" alt="Quiz Screenshot" width="600px" />
<br/>
*Swagger page*

## 🧰 Getting Started (Full Stack)

### 1. Clone the Repository

```bash
git clone https://github.com/talk2dennis/naijaedu.git
cd naijaedu
```

---

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
JWT_SECRET=your_jwt_secret
MONGO_URI=your_mongodb_connection_string
CORS_ORIGIN=http://localhost:5173
GEMINI_API_KEY=your_google_genai_key
```

Run locally:

```bash
npm run dev
```

---

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Create a `.env` file:
```env
VITE_GOOGLE_CLIENT_ID=your-google-client-id
VITE_API_BASE_URL=you-backend-url
```

---

## 🔗 API Reference

Check the Swagger documentation:

* [http://localhost:5000/api-docs](http://localhost:5000/api-docs)
* [Production Swagger](https://naijaedu.onrender.com/api-docs)

---

## ✨ Demo Video

📽️ [Watch the Demo](https://www.linkedin.com/posts/talk2dennis_naijaedu-3mmt-knowledgeshowcase-activity-7351725128436637697-wWkJ?utm_source=share&utm_medium=member_desktop&rcm=ACoAABdbbuAB4ddVF5l7FsFgL90cpOQdQ3KB29Y) – See how a student can go from topic confusion to quiz mastery in seconds.

---

## 🎯 Ideal For

* Secondary school students (WAEC/NECO)
* Self-learners and teachers
* Education-focused hackathons or AI showcases

---

## 📦 Deployment

* **Frontend**: Vercel – [naijaedu.vercel.app](https://naijaedu.vercel.app)
* **Backend**: Render – [naijaedu.onrender.com](https://naijaedu.onrender.com)

---

## 📄 License

MIT © 2025 [Dennis Adigwe](https://github.com/talk2dennis)

