# Library Management API

This API provides functionalities to manage a library's book inventory, handle user reservations, and track book borrowings.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Endpoints](#endpoints)
- [Usage](#usage)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used

- Node.js
- TypeScript
- Express.js
- MongoDB
- TypeORM
- Tsyringe (Dependency Injection)
- Nodemailer (for email notifications)

## Setup

### Prerequisites

Make sure you have the following installed on your machine:

- Docker
- Makefile

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Copy .env.example into .env
   ```bash
   cp .env.example .env
   ```

3. Spin up the container
   ```bash
   make up
   ```

4. Seed database
   ```bash
   yarn db:seed
   ```

4. Build
   ```bash
   yarn build
   ```

5. Start application
   ```bash
   yarn start
   ```

If you need to start in dev mode, you can also 
   ```bash
   yarn start:dev
   ```

### Endpoints

- GET /v1/books: Retrieve all books in the library.
- POST /v1/books: Add a new book to the library.
- POST /v1/reservations: Creates reservation.
- POST /v1/reservations/:id/return: Returns reservation <-- THIS IS NOT RESTful IMHO, looks more like a BFF Endpoint


## Missing things:
- Value Objects: Domain layer has primitives, and this should not be the case, ideally every property should be encapsulated into a Value object
- Domain Events: Domain Entities should hold a record of relevant domain events, on the other hand, a Domain Event Bus should be put in place
- Isolate components: Despite using a DI container, each `component` should be aseptic enough to be registered in the app (this means, controllers, repositories, services)
- DTO Validation: There's no DTO Validation in place, `class-validator` and `class-transformer`
- Application Layer: This is an opinionated one, but I like Application Layer to work with Value Objects, primitives should only be seen in `infrastructure`
- Mappers: DTO to Command mappers are missing, its resposibility is to get the validated DTO and transform into the correct `Service` Input
- Service Signatures: `type Service<I,O>` should be implemented in every service to ensure the proper return values are respected:
``` 
type FindBooksService = Service<FindBooksService, Book[]>
```