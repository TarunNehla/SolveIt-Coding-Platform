# SolveIt Coding Platform

A modern coding platform where users can solve programming problems, track their progress, and compete with others. Built with React, Node.js, and DaisyUI, featuring Google Authentication and C++ code execution.

## 🚀 Features

- **User Authentication**
  - Google OAuth integration
  - Traditional email/password registration
  - Secure session management

- **Problem Solving**
  - Wide variety of coding problems
  - C++ code submission and execution
  - Real-time code evaluation
  - Submission history tracking

- **Interactive UI**
  - Modern interface built with DaisyUI and Tailwind CSS
  - Responsive design for all devices
  - User-friendly code editor
  - Intuitive navigation

- **Competitive Features**
  - Global leaderboard
  - User rankings
  - Submission statistics
  - Performance tracking

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- TailwindCSS
- DaisyUI
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB
- Docker for code execution

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB
- Docker (for code execution)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/SolveIt-Coding-Platform.git
cd SolveIt-Coding-Platform
```

2. **Frontend Setup**
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

3. **Backend Setup**
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start development server
npm run dev
```

4. **Docker Setup (for code execution)**
```bash
# Navigate to backend directory
cd backend

# Build and run Docker container
docker-compose up -d
```

### Environment Variables

Create `.env` files in both frontend and backend directories.

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

**Backend (.env)**
```env
PORT=3000
MONGODB_URI=your_mongodb_uri
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
JWT_SECRET=your_jwt_secret
```

## 📁 Project Structure

```
SolveIt-Coding-Platform/
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/      # API services
│   │   └── utils/         # Utility functions
│   └── public/            # Static files
└── backend/               # Node.js backend
    ├── controllers/       # Route controllers
    ├── models/           # Database models
    ├── routes/           # API routes
    └── utils/            # Utility functions
```

## 🔒 Authentication Flow

1. Users can sign in using Google OAuth or traditional email/password
2. Upon successful authentication, a JWT token is issued
3. Token is stored in localStorage for persistent sessions
4. Protected routes require valid JWT token

## 💻 Code Execution Flow

1. User submits C++ code through the platform
2. Code is securely stored and processed in Docker container
3. Input test cases are run against the submission
4. Results are evaluated and stored in the database
5. User receives real-time feedback on submission

## 🏆 Leaderboard System

- Points are awarded based on problem difficulty
- Faster solutions receive bonus points
- Global ranking updated in real-time
- User profile shows detailed submission statistics

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Thanks to all contributors
- Inspired by competitive programming platforms
- Built with love for the coding community 
