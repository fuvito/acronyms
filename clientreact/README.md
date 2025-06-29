# React + TypeScript + Vite
# Acronyms Client Application

A React application for managing acronyms. This client works with the Acronyms server application to provide a full-stack solution for storing and retrieving acronyms, their definitions, and descriptions.

## Features

- View all acronyms in a responsive grid layout
- Search acronyms by name or definition
- Add new acronyms with definitions and optional descriptions
- Modern and responsive UI

## Technologies Used

- React 19.1.0
- TypeScript 5.8.3
- Vite 7.0.0
- Axios for API communication
- CSS for styling

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm package manager
- Acronyms server application running on http://localhost:8080

### Installation

1. Clone the repository
2. Navigate to the client directory
3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and navigate to http://localhost:5173

## Project Structure

- `src/components/` - React components
- `src/types/` - TypeScript type definitions
- `src/services/` - API service modules
- `src/App.tsx` - Main application component

## Available Scripts

- `npm run dev` - Run the development server
- `npm run build` - Build the production-ready application
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the built application

## API Endpoints

The client communicates with the following API endpoints:

- `GET /api/acronyms` - Get all acronyms
- `GET /api/acronyms/search?acronym={query}` - Search acronyms by acronym text
- `GET /api/acronyms/search?definition={query}` - Search acronyms by definition text
- `POST /api/acronyms` - Create a new acronym
- `PUT /api/acronyms/{id}` - Update an existing acronym
- `DELETE /api/acronyms/{id}` - Delete an acronym
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
