# Trello-like REST API

A RESTful API for a Trello-like task management system built using **NestJS**, **PostgreSQL**, and **Prisma**.  
This is a test assignment for **Purrweb**.

## Features

- User authentication (JWT)
- Users, comments, columns, cards management
- Role-based access (basic)
- CRUD operations for all main entities
- PostgreSQL as database
- Prisma as ORM
- RESTful architecture
- Swagger documentation

## Tech Stack

- **NestJS**
- **Prisma**
- **PostgreSQL**
- **Swagger** (OpenAPI)

## Getting Started

### Prerequisites

- Node.js >= 18
- npm
- PostgreSQL running locally

### Installation

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
npm install
```
### Environment Setup
Create a .env file in the root directory and add the following:
``` 
DATABASE_URL="postgresql://user:password@localhost:5432/your_db"
JWT_SECRET="your_secret_key"
```

### Database
Run Prisma migrations and generate the client:

```
npx prisma migrate dev
npx prisma generate
```
### Start the Server

```
# development
npm run start

# watch mode
npm run start:dev
```

API Documentation
This project includes Swagger documentation available at:
```
http://localhost:3000/api
```
You can explore and test all endpoints via the Swagger UI.

## Main endpoints:

- Users (/users)
- Columns (/columns)
- Cards (/cards)
- Comments (/comments)

### Author

[Dmitri Minckevich](https://github.com/rauck1s)