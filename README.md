# User Profile Web Application

A responsive web application for creating and managing user profiles with MongoDB integration.

## Features

- User profile creation and editing
- Selection of interests and preferred locations
- Modern and responsive UI
- MongoDB data persistence

## Installation

1. Clone the repository:
   ```
   git clone [repository-url]
   cd [repository-name]
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   MONGODB_URI=mongodb://localhost:27017/userProfileDB
   PORT=3000
   ```

4. Start the server:
   ```
   npm start
   ```

5. Access the application at `http://localhost:3000`

## Technologies Used

- HTML, CSS, JavaScript (Frontend)
- Node.js with Express (Backend)
- MongoDB (Database)

## Project Structure

- `public/` - Static files (CSS, JavaScript, Images)
- `views/` - HTML templates
- `models/` - MongoDB schemas
- `routes/` - API routes
- `server.js` - Application entry point