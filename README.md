# Still In? – Polling App (Expired Access Handling Challenge)

Welcome to the **Still In?** polling app. This is a simple full-stack application built for a debugging challenge.

## Tech Stack

- **Backend**: Node.js, Express, JWT, bcryptjs (In-memory storage)
- **Frontend**: React (Vite), React Router, Axios, Tailwind CSS, Framer Motion

## Scenario

The app allows users to signup, login, and vote on a public poll. To make it more "real-time," it polls the backend every 10 seconds to fetch the latest vote counts. 

However, there's a problem: **JWT tokens expire after 1 minute**. When the token expires, the app starts behaving poorly.

### Known Issues (The Challenge)

1.  **Backend Mishandling**: When a token expires, the backend middleware catches the error but returns a generic `500 Internal Server Error` instead of the standard `401 Unauthorized`.
2.  **Frontend Resource Leak**: When the backend returns an error (401 or 500) during polling, the frontend ignores it and continues the interval indefinitely.
3.  **UI Desync**: After token expiry, the user can still see the dashboard and vote buttons. Clicking "Vote" shows an alert, but doesn't redirect the user to login. The user is essentially stuck in a "zombie" session.

## Getting Started

### 1. Prerequisites
- Node.js (v18+)
- npm

### 2. Installation

Clone this repository and install dependencies in both the `server` and `client` folders.

```bash
# Terminal 1 - Backend
cd server
npm install
npm start

# Terminal 2 - Frontend
cd client
npm install
npm run dev
```

### 3. Usage
1.  Go to the signup page and create an account.
2.  Log in. You will be redirected to the Dashboard.
3.  Vote on a poll option.
4.  **Wait for 1 minute.**
5.  Try to vote again. Notice the error. 
6.  Look at the Network tab in DevTools. Notice the polling continuing despite the errors.

## Your Task

Your goal is to fix the "Expired Access" handling on both the backend and frontend:

1.  **Backend Fix**: Modify `server/middleware/auth.js` to return a `401` status specifically for expired tokens.
2.  **Frontend Interceptor**: Add a response interceptor to `client/src/api/client.js` that catches `401` errors.
3.  **Graceful Exit**: On a `401` error:
    - Clear the polling interval.
    - Remove the user and token from localStorage.
    - Redirect the user to the `/login` page.
4.  **Logout Improvement**: Ensure the logout button also clears the polling interval.

## Documentation

Record your investigation and fix process in `Changes.md`.
# userr
