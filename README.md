# Resume Builder Backend API

A robust NestJS-powered backend API for a resume builder application with JWT authentication, TypeORM database integration, and AI-powered summary enhancement capabilities.

## Features

### 🔐 Authentication & Authorization
- JWT token-based authentication
- Password hashing with bcrypt
- Protected routes with guards
- User registration and login
- Token expiration handling (1 hour)

### 👤 User Management
- User registration with validation
- Unique email and username constraints
- Password encryption and secure storage
- User profile management

### 📋 Resume Management
- Complete CRUD operations for resumes
- User-specific resume access control
- Comprehensive resume sections support
- Cascading deletes for data integrity

### 📊 Resume Sections
- **Skills**: Name and description with resume association
- **Education**: Degree, institution, area of study, date range, GPA
- **Experience**: Job title, company, date range, description
- **Projects**: Name, date, link, description
- **Certifications**: Name, issuer, date, URL, description

### 🤖 AI Integration
- AI-powered summary enhancement
- Context-aware improvements based on resume content
- RESTful AI enhancement endpoint

### 📚 API Documentation
- Swagger/OpenAPI integration
- Comprehensive DTO documentation
- Response type definitions
- API property examples

## Technology Stack

- **Framework**: NestJS
- **Database ORM**: TypeORM
- **Authentication**: JWT with Passport
- **Password Hashing**: bcrypt
- **Validation**: class-validator
- **Documentation**: Swagger/OpenAPI
- **Database**: PostgreSQL/MySQL (configurable)


## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- PostgreSQL or MySQL database
- AI service integration (for summary enhancement)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd resume-builder-backend
```

2. Install dependencies:
```bash
npm install
```

3. Required packages:
```bash
npm install @nestjs/core @nestjs/common @nestjs/platform-express
npm install @nestjs/typeorm typeorm
npm install @nestjs/jwt @nestjs/passport passport passport-jwt
npm install @nestjs/swagger swagger-ui-express
npm install class-validator class-transformer
npm install bcrypt
npm install pg # for PostgreSQL or mysql2 for MySQL
```

## Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=resume_builder

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=1h

# Application
PORT=3000
NODE_ENV=development

# AI Service (if applicable)
AI_API_KEY=your-ai-api-key
AI_SERVICE_URL=https://your-ai-service.com/api
```

### Database Configuration
Update your database configuration in `app.module.ts`:

```typescript
TypeOrmModule.forRoot({
  type: 'postgres', // or 'mysql'
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Resume, Skill, /* other entities */],
  synchronize: true, // disable in production
}),
```



## Development

### Running the Application
```bash
# Development mode with hot reload
npm run start:dev

# Production mode
npm run start:prod

# Debug mode
npm run start:debug
```

### Database Operations
```bash
# Generate migration
npm run typeorm:generate-migration -- MigrationName

# Run migrations
npm run typeorm:run-migrations

# Revert migration
npm run typeorm:revert-migration
```



## Security Features

### JWT Authentication
- Secure token generation with configurable expiration
- Bearer token extraction from Authorization header
- Protected route validation with guards
- User context injection in protected endpoints

### Password Security
- bcrypt hashing with salt rounds
- Password validation requirements
- Secure password comparison

### Data Validation
- DTO-based request validation
- Input sanitization with class-validator
- Type safety with TypeScript
- Required field validation

### Authorization
- User-specific resource access control
- Resume ownership validation
- Cascade delete protection
- SQL injection prevention with TypeORM

## Error Handling

### Exception Filters
- Global exception handling
- Standardized error responses
- HTTP status code mapping
- Validation error formatting

### Common Error Responses
```typescript
// 401 Unauthorized
{ message: "Invalid credentials" }

// 404 Not Found  
{ message: "Resume not found" }

// 400 Bad Request
{ message: "Validation failed", errors: [...] }

// 403 Forbidden
{ message: "User not authorized to access this resume" }
```



## API Documentation

### Swagger Integration
Access API documentation at: `http://localhost:3000/api-docs`



