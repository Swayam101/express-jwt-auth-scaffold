# Express JWT Auth Scaffold

A TypeScript-based Express.js scaffold with JWT authentication, MongoDB integration, and a modular feature-based architecture.

## Features

- TypeScript support
- JWT Authentication
- MongoDB with Mongoose
- Modular architecture based on features
- Winston logger
- Express validator
- CORS enabled
- Environment variables support
- Error handling middleware

## Project Structure

```
src/
├── config/           # Configuration files
├── features/         # Feature-based modules
│   ├── auth/        # Authentication feature
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   └── user/        # User feature
│       ├── controllers/
│       ├── models/
│       ├── routes/
│       └── services/
├── middleware/       # Custom middleware
├── utils/           # Utility functions
└── types/           # TypeScript type definitions
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/your-database
   JWT_SECRET=your-secret-key
   JWT_EXPIRES_IN=7d
   NODE_ENV=development
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the TypeScript code
- `npm start`: Start the production server
- `npm run lint`: Run ESLint
- `npm test`: Run tests

## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }
  ```

- `POST /api/auth/login`: Login user
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

## Adding New Features

1. Create a new feature directory in `src/features/`
2. Add the following structure:
   ```
   feature/
   ├── controllers/  # Request handlers
   ├── models/       # Database models
   ├── routes/       # Route definitions
   └── services/     # Business logic
   ```
3. Register routes in `src/index.ts`

## Security

- Passwords are hashed using bcrypt
- JWT tokens are used for authentication
- Environment variables for sensitive data
- Input validation using express-validator

## License

ISC 