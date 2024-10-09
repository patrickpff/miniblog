# MiniBlog

A simple blogging platform built with React and Firebase that allows users to create, edit, and delete posts. This project demonstrates basic CRUD operations, Firebase authentication, and Firestore database integration.

## About the Project

This MiniBlog was developed as part of the <a href="https://www.udemy.com">Udemy</a> <a href="https://www.udemy.com/course/react-do-zero-a-maestria-c-hooks-router-api-projetos/">React do Zero a Maestria (c/ hooks, router, API, Projetos)</a>.

## Features

- **User Authentication:** Sign up and log in using Firebase Authentication.
- **Create Post:** Authenticated users can create new blog posts.
- **Edit Post:** Users can update their own posts.
- **Delete Post:** Users can delete their own posts.
- **Firestore Integration:** Store posts and user data in Firebase Firestore.
- **Responsive Design:** Works well on mobile and desktop devices.

## Technologies Used

- **Frontend:** React, React Router, CSS
- **Backend:** Firebase (Authentication, Firestore)
- **Hosting:** Firebase Hosting (optional)

## Getting Started

### Getting Started

- Node.js (v14.x or later)
- Firebase Account

### Installation

1. Clone the repository:

```bash
git clone https://github.com/patrickpff/miniblog.git
cd miniblog
```

2. Install dependencies:

```bash
npm install
```

3. Create a Firebase project:

- Go to the Firebase Console.
- Click Add Project and follow the instructions.
- Once created, add a new **web app** to your project and obtain the Firebase config.

4. Set up environment variables:

At the folder `\src\firebase\`, copy the config_example.jsx to config.jsx and set your Firebase configuration:

```bash
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

5. Start the development server:

```bash
npm run dev
```

The game will be accessible at `http://localhost:5173/` in your browser.

### Firebase Setup

1. Enable Authentication:

   - In the Firebase Console, go to Authentication and enable Email/Password authentication.

2. Set up Firestore:

   - In the Firebase Console, go to Firestore Database and create a new database in test mode.

### Available Scripts

In the project directory, you can run:

- `npm run dev` - Runs the app in development mode.
