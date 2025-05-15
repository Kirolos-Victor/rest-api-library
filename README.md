```markdown
# Rest API Library

A RESTful API built using the NestJS framework, designed for efficient and scalable server-side applications. This
project includes user authentication, registration, and token-based authorization.

## Features

- User registration and login with hashed passwords using `bcrypt`.
- JWT-based authentication and token verification.
- MongoDB integration using Mongoose.
- Input validation with `class-validator`.
- Custom `JwtAuthGuard` for route protection.
- Public route decorator for bypassing authentication.

## Prerequisites

- Node.js (v20 or higher)
- npm (v8 or higher)
- MongoDB (running locally or remotely)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd rest-api-library
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory and add the following:
   ```dotenv
   DB_URI=mongodb://localhost:27017/library-nest
   JWT_SECRET=super_secret_key
   JWT_EXPIRES_IN=1h
   ```

4. Start MongoDB:
   Ensure MongoDB is running locally or update the `DB_URI` in the `.env` file to point to your MongoDB instance.

## Running the Application

- **Development mode**:
  ```bash
  npm run start:dev
  ```

- **Production mode**:
  ```bash
  npm run start:prod
  ```

- **Debug mode**:
  ```bash
  npm run start:debug
  ```

## Testing

- **Unit tests**:
  ```bash
  npm run test
  ```

- **End-to-end (e2e) tests**:
  ```bash
  npm run test:e2e
  ```

- **Test coverage**:
  ```bash
  npm run test:cov
  ```

## Project Structure

- `src/auth`: Authentication module (guards, strategies, services, controllers, DTOs).
    - `jwt.auth.guard.ts`: Custom guard for JWT-based route protection.
    - `jwt.strategy.ts`: JWT strategy for token validation.
- `src/decorators`: Custom decorators (e.g., `Public` for marking routes as public).
- `src/user`: User module (services, controllers, DTOs).
- `src/book`: Book module (services, controllers, DTOs).

## Environment Variables

- `DB_URI`: MongoDB connection string.
- `JWT_SECRET`: Secret key for signing JWTs.
- `JWT_EXPIRES_IN`: Expiration time for JWTs (e.g., `1h`, `30m`).

## License

This project is licensed under the MIT License.

```