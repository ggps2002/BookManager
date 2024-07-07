# Book Manager App

This application allows users to manage and track details of the books they read. Users can log in, add book details, and sort their books based on ratings, title, or recency.

## Features

- **Authentication:** Users authenticate via Google OAuth before accessing their dashboard.
- **Dashboard:** Once authenticated, users can view and manage their book collection.
- **Sorting:** Books can be sorted by ratings, title, or recency.
- **Database:** Utilizes both PostgreSQL and MongoDB for storing book and user data.
- **Tech Stack:** Node.js, Express.js, React, PostgreSQL, MongoDB, Passport.js, and Google OAuth for authentication.

## Tech Stack

- **Frontend:** React
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL, MongoDB
- **Authentication:** Passport.js with Google OAuth

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ggps2002/BookManager.git
   cd Frontend
   npm run dev
   cd Backend
   nodemon server.js / node server.js
