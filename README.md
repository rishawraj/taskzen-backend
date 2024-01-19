# Taskzen Backend

TaskZen Backend is the server-side application for managing tasks, lists, and tags. It provides RESTful APIs to interact with user data, tasks, lists, and tags. This backend is built using [Node.js](https://nodejs.org/) and [Express](https://expressjs.com/), and it utilizes [MongoDB](https://www.mongodb.com/) as the database for storing user-related information.

## Features

- **User Management**: Create, read, update, and delete user accounts.
- **Task Management**: Perform CRUD operations on tasks, associate them with lists, and tag them for better organization.
- **List Management:** Manage task lists, associate tasks with lists, and organize tasks within lists.
- **Tag Management:** Categorize tasks using tags, and easily filter tasks based on tags.
- **Security**: Secure endpoints with authentication to ensure data privacy and integrity.
- **Scalability:** Built with scalability in mind to handle a growing number of users and tasks.

## Requirements

- [Node.js](https://nodejs.org/) (v14.0.0 or higher)
- [MongoDB](https://www.mongodb.com/) (Make sure MongoDB is running on your local machine or update the connection string in the configuration)

## Installation

1. Clone the respository:

   ```
   git clone https://github.com/your-username/taskzen-backend.git
   ```

1. Install dependencies:

   ```
   cd taskzen-backend
   npm install

   ```

1. Set up the environment variables;

   Create a .env file in the root directory and add the following:

   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/taskzen
   SECRET_KEY=your_secret_key
   ```

   Update the MONGODB_URI and SECRET_KEY values as needed.

1. Start the server:

   ```
   npm run build & npm run start
   ```
