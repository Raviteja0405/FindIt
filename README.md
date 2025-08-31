# FindIt — Campus Lost & Found Portal

FindIt is a **MERN stack web application** designed to streamline the lost & found process on campus.  
Students can **report lost items**, **browse found items**, and **contact each other** securely — making it easier to reunite people with their belongings.

---

## 🚀 Features

- 🔐 **Authentication**
  - Google OAuth 2.0 login
  - Email/password registration
  - Secure sessions & JWT

- 🎒 **Lost & Found Management**
  - Report lost items with details and images
  - Post found items
  - Search & filter by keywords, category, or location

- 💬 **Communication**
  - Securely contact item owners via protected details
  - Ensures privacy by requiring completed contact info before posting

- 🎨 **UI/UX**
  - Responsive design with **Tailwind CSS**
  - Dark mode support
  - Intuitive and mobile-friendly experience

- 🛠 **Developer Friendly**
  - Modular folder structure (backend + frontend)
  - ESLint + Prettier for consistent code
  - Jest & Supertest for unit/integration tests
  - GitHub Actions for CI/CD

---

## 🏗️ Tech Stack

- **Frontend:** React.js, Tailwind CSS  
- **Backend:** Node.js, Express.js, MongoDB  
- **Auth:** Google OAuth 2.0, JWT  
- **Testing:** Jest, Supertest  
- **DevOps:** GitHub Actions (CI)

---

## 📂 Project Structure

```txt
FindIt/
│── backend/         # Express.js + MongoDB backend
│   ├── src/
│   │   ├── models/      # Mongoose models
│   │   ├── routes/      # Express routes
│   │   ├── controllers/ # Route controllers
│   │   ├── middlewares/ # Auth & error handling
│   │   ├── utils/       # Helpers (DB connection, etc.)
│   │   └── server.js    # App entry point
│   ├── tests/           # Jest + Supertest tests
│   └── package.json
│
│── frontend/        # React + Tailwind frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
│── .github/workflows/ci.yml  # CI pipeline
│── README.md
````

---

## ⚡ Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Raviteja0405/FindIt.git
cd FindIt
```

### 2️⃣ Backend setup

```bash
cd backend
npm install
cp .env.example .env   # Copy example env file and fill in your credentials
npm run dev
```

### 3️⃣ Frontend setup

```bash
cd ../frontend
npm install
npm start
```

---

## 🧪 Running Tests

Run backend tests:

```bash
cd backend
npm test
```

---

## 📁 Environment Variables

Create a `.env` file in your `backend` folder with the following variables:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/FindIt
JWT_SECRET=your_jwt_secret_here

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

SESSION_SECRET=your_session_secret
CLIENT_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback
```

## 🤝 Contributing

Contributions are welcome!
Please open an issue or submit a pull request.

---

## 📜 License

This project is licensed under the **MIT License**.