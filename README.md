# Todo App

A simple, modern todo application built with React and Vite.

## Features

- ✅ Add new todos
- ✅ Mark todos as complete/incomplete
- ✅ Delete individual todos
- ✅ Clear all completed todos
- ✅ Persistent storage (localStorage)
- ✅ Beautiful, responsive design
- ✅ Real-time statistics

## Getting Started

### Prerequisites

Make sure you have Node.js installed on your machine.

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technologies Used

- React 18
- Vite
- CSS3 (with modern features)
- LocalStorage for persistence

## Project Structure

```
src/
├── App.jsx          # Main application component
├── App.css          # Application styles
├── main.jsx         # React entry point
└── index.css        # Global styles
```

## Usage

1. **Adding Todos**: Type in the input field and click "Add" or press Enter
2. **Completing Todos**: Click the checkbox next to any todo
3. **Deleting Todos**: Click the "×" button next to any todo
4. **Clearing Completed**: Click "Clear completed" to remove all completed todos

The app automatically saves your todos to localStorage, so they'll persist between browser sessions.
