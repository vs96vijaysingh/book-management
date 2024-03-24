# book-management

A simple Node.js API for managing book entries. Features user authentication, CRUD operations for books (title, author, publication year), filtering books by author or publication year, and basic security measures.

### Features

User Authentication: Users can authenticate themselves to access protected routes.
CRUD Operations: Allows creating, reading, updating, and deleting book entries.
Filtering: Users can filter books by author or publication year.
Security Measures: Implements basic security measures to validate user input and protect against common vulnerabilities.

### Getting Started

To get started with this API, follow these steps:

Clone the repository to your local machine:git clone <repository-url>
Install dependencies: npm install
Set up environment variables:PORT=4545
DB_CONNECTION_STRING=your mongodb connection string
SECRET_KEY=your-secret-key (jwt)
Start the server:npm start

### API Endpoints

# User Routes:

POST /api/v1/login: login by email and password.

GET /api/v1/user: Retrieve all users.
GET /api/v1/user/:id: Retrieve a specific user by ID.
POST /api/v1/user: Register a new user.
POST /api/v1/login: Login and obtain an authentication token.
PUT /api/v1/user/:id: Update a user entry.
DELETE /api/v1/user/:id: Delete a user entry.

# Book Routes:

GET /api/v1/book: Retrieve all books.
GET /api/v1/book/:id: Retrieve a specific book by ID.
POST /api/v1/book: Create a new book entry.
PUT /api/v1/book/:id: Update a book entry.
DELETE /api/v1/book/:id: Delete a book entry.

### Filtering Routes:

GET /api/v1/user?name=:name: Filter users by name.
GET /api/v1/user?email=:email: Filter users by email.

GET /api/v1/book?author=:author: Filter books by author.
GET /api/v1/book?year=:year: Filter books by publication year.
