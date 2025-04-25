# LogIn-SignUp-React

This repository contains a full-stack application for user authentication, featuring a React frontend, a Node.js backend, and a MySQL database. The project is organized under the `HW04-JoseMarin` directory and submitted as part of a homework assignment (HW04).

## Project Structure

- **HW04-JoseMarin/**
  - **CH4/**
    - **client/**: React frontend
      - `src/`: React components and pages (`App.jsx`, `Home.jsx`, `Login.jsx`, `SignUp.jsx`, `Dashboard.jsx`)
      - `public/`: Static assets (e.g., images: `Confidential.png`, `Secret.png`, `TopSecret.png`, `Unclassified.png`)
      - `package.json`: Frontend dependencies
    - **server/**: Node.js backend
      - `server.js`: Main server file
      - `controllers/`: User authentication logic (`userController.js`)
      - `routes/`: API routes (`userRoutes.js`, `protectedRoutes.js`)
      - `middlewares/`: Authentication middleware (`auth.js`)
      - `config/`: Database configuration (`mysqldb.js`)
      - `package.json`: Backend dependencies
  - **MySQL/**: Database files
    - `HW04-JoseMarin.sql`: SQL script to set up the database schema
    - `HW04-JoseMarin.csv`: Sample data for the database

## Prerequisites

- **Node.js**: v14 or higher
- **MySQL**: v8 or higher
- **npm**: Comes with Node.js
- **Git**: To clone the repository

## Setup Instructions

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/Marin2409/LogIn-SignUp-React.git
cd LogIn-SignUp-React
