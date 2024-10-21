# Node.js User and Admin Management API

This is a user and admin management system built with **Node.js**, **Express**, **TypeScript**, and **PostgreSQL**. The application supports role-based access control, allowing users and admins to register, log in, and manage profiles, while admins can manage users. The API uses JWT authentication for secure access and includes logging, pagination, and Dockerization for easy deployment.

## Features

- **User Registration & Login**: Allows users to sign up and log in using JWT authentication.
- **Role-Based Access Control (RBAC)**: Different roles (`admin`, `user`) for managing access to certain routes.
- **Profile Management**: Users can update their profile information.
- **Admin Features**: Admins can view, update, and delete users.
- **JWT Authentication**: Secure access to endpoints with JWT.
- **Pagination**: Supports paginated queries for listing users.
- **Logging Middleware**: Logs all API requests and responses.
- **Dockerized Setup**: The project is containerized for easy deployment.

## Technologies Used

- **Node.js**: Backend runtime for building the server.
- **Express**: Web framework for Node.js.
- **TypeScript**: Provides type safety and enhances the development experience.
- **JWT (JSON Web Token)**: Used for authentication and securing routes.
- **PostgreSQL**: Database used for storing user information.
- **TypeORM**: ORM for interacting with the PostgreSQL database.
- **Docker**: Containerization for consistent environment setup.

## Getting Started

### Prerequisites

- **Node.js** (v20.18.0 or later)
- **Docker** (if using Docker)
- **PostgreSQL** (if running without Docker)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/chitrank-bisht/assignment-nm.git

2. Navigate into the project directory:

    ```bash
    cd assignment-nm

3. Install dependencies:

    ```bash
    npm install

4. Set up your environment variables in a .env file:

    ```bash
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=postgres
    DB_PASSWORD=password
    DB_NAME=mydb
    JWT_SECRET=your_secret_key

## Running the Application

1. ## Without Docker:

- **Ensure PostgreSQL is running**:
   - Make sure PostgreSQL is installed and running on your local machine, or connect to a remote PostgreSQL server.
     - If PostgreSQL is installed locally, you can start it using:
       - **Linux/macOS**:
         ```bash
         sudo service postgresql start
         ```
       - **Windows**: Start PostgreSQL through the PostgreSQL Service app or use `pg_ctl` if PostgreSQL is installed via command-line tools.

- **Set up your database**:
   - Ensure your `.env` file is set up correctly with the database connection details:
     ```bash
     DB_HOST=localhost
     DB_PORT=5432
     DB_USERNAME=your_username
     DB_PASSWORD=your_password
     DB_NAME=your_db_name
     DB_SYNCHRONIZE=false
     DB_LOGGING=false
     ```

- Build the TypeScript files:

    ```bash
    npm run build
    

- Start the application:

    ```bash
    npm start

2. With Docker:

- Build and run the Docker containers:

    ```bash
    docker-compose up --build

## Development Mode

- For development with hot-reloading, you can run:

    ```bash
    npm run dev-server

This will compile TypeScript files and restart the server automatically.

## API Endpoints

### **User Routes** (`/api`):

- **POST `/register`**: Register a new user.
- **POST `/login`**: Log in and obtain a JWT token.
- **GET `/profile`**: Get the authenticated user's profile (JWT required).

### **Admin Routes** (`/api/admin`):

- **GET `/users`**: Get a paginated list of users (Admin only).
- **POST `/users`**: Create new User (Admin only).
- **PUT `/users/:id`**: Update the authenticated user's profile (Admin only).
- **DELETE `/users/:id`**: Delete a user (Admin only).


## Middleware

- **Authentication Middleware**: JWT-based authentication to protect routes.
- **Authorization Middleware**: Ensures only users with the admin role can access admin routes.
- **Logging Middleware**: Logs all incoming requests and responses to the console.

## Docker Configuration

The application is Dockerized for easy setup and deployment. The docker-compose.yml file handles the service orchestration, including the app and PostgreSQL database.

- To run the application in Docker:

    ```bash
    docker-compose up --build

Volumes are used for persistent database storage.