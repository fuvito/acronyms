# Angular Acronyms Client Application

A modern Angular application for managing acronyms. This client works with the Acronyms server application to provide a full-stack solution for storing and retrieving acronyms, their definitions, and descriptions.

## Features

- View all acronyms in a responsive grid layout
- Search acronyms by name or definition
- Add new acronyms with definitions and optional descriptions
- Modern and responsive UI

## Technologies Used

- Angular 17.1.0
- TypeScript 5.3.2
- RxJS 7.8.0
- Angular's HttpClient for API communication
- CSS for styling

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm package manager
- Acronyms server application running on http://localhost:8080

### Installation

1. Clone the repository
2. Navigate to the clientng directory
3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm start
```

5. Open your browser and navigate to http://localhost:4200

## Project Structure

- `src/app/components/` - Angular components
- `src/app/models/` - TypeScript interfaces and models
- `src/app/services/` - API service modules
- `src/app/interceptors/` - HTTP interceptors for error handling
- `src/app/app.component.ts` - Main application component

## Available Scripts

- `npm start` - Run the development server
- `npm run build` - Build the production-ready application
- `npm test` - Run unit tests
- `npm run watch` - Build the application and watch for changes

## API Endpoints

The client communicates with the following API endpoints:

- `GET /api/acronyms` - Get all acronyms
- `GET /api/acronyms/search?acronym={query}` - Search acronyms by acronym text
- `GET /api/acronyms/search?definition={query}` - Search acronyms by definition text
- `POST /api/acronyms` - Create a new acronym
- `PUT /api/acronyms/{id}` - Update an existing acronym
- `DELETE /api/acronyms/{id}` - Delete an acronym
