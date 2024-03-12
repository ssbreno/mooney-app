![image](https://github.com/ssbreno/mooney-app/assets/8092325/1838c235-87ba-4389-af05-ece769f268a2)


## Introduction

Mooney Journal App

## Technologies Used

- Docker
- NextJs
- Prisma
- PostgreSQL (Database)
- Other Libraries: Prettier (Code formatter), ESLint (Linter)

## Requirements

- Docker and Docker Compose

## Getting Started

To run the Mooney Journal App project on your local machine, follow these steps:

1. **Environment Setup**: Create a `.env` file based on the provided `.env-local` template.
2. **Install Dependencies**: Run `npm install` to install required dependencies.
3. **Build Containers**: Use `docker-compose build` to build the Docker containers.
4. **Start Containers**: Execute `docker-compose up -d` to start the containers in detached mode.
5. **Run Migrations**: Use `npx prisma generate dev` and `npx prisma generate deploy` to run migrations.
6. **Start the Application**: Use `npm run dev` to start the application.
