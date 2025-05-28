# Casino Simulator

A simple full-stack web application simulating a casino environment. Features include classic games like **Roulette** and **Blackjack**, user registration and login, and a fake deposit/withdraw system for virtual currency.

---

## Features

- 🎲 **Roulette & Blackjack**: Play popular casino games with realistic rules and UI.
- 💰 **Fake Deposit/Withdraw**: Manage your virtual balance with simulated transactions.
- **User Authentication**: Register, log in, and manage your account securely.
- **Backend**: Python Django (REST API)
- **Frontend**: TypeScript + React, styled with [Mantine](https://mantine.dev/)

---

## Getting Started

### Prerequisites

- [Python 3.10+](https://www.python.org/)
- [Node.js 18+](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

---

### Backend Setup (Django)

1. **Clone the repository:**
     ```bash
     git clone https://github.com/white67/casino_simulator.git
     ```

2. **Create a virtual environment and install dependencies:**
     ```bash
     cd casino_simulator/backend

     python -m venv venv
     source venv/bin/activate  # On Windows: .\venv\Scripts\activate
     pip install -r requirements.txt
     ```

3. **Apply migrations and run the server:**
     ```bash
     python backserver/manage.py migrate
     python backserver/manage.py runserver
     ```

---

### Frontend Setup (React + Mantine)

1. **Navigate to the frontend directory:**
     ```bash
     cd frontend
     ```

2. **Install dependencies:**
     ```bash
     npm install
     ```

3. **Start the development server:**
     ```bash
     npm run dev
     ```

---

### Configuration

- Default backend runs at `http://localhost:8000`
- Default frontend runs at `http://localhost:5173`

---

## Screenshots

![Roulette Game](https://raw.githubusercontent.com/white67/casino_simulator/main/utils/roulette.png)

