# Pomodoro Productivity App - Front-End

This front-end project is part of a full-stack Pomodoro-based productivity app. The application provides a comprehensive solution for managing tasks, utilizing the Pomodoro technique, tracking productivity statistics, and customizing app settings. With features such as task management, calendar integration, repeatable tasks, tags, drag-and-drop functionality, and more, the app aims to enhance productivity and time management for users.

## Key Features

- Task Management: Create, edit, and organize tasks with different attributes such as due date, priority, and tags.
- Pomodoro Timer: Utilize the Pomodoro technique for efficient work sessions and breaks, allowing users to focus and optimize productivity.
- Calendar Integration: Integrate tasks with a calendar view, providing a visual representation of scheduled tasks and deadlines.
- Repeatable Tasks: Set tasks to repeat at specified intervals, ensuring recurring tasks are automatically added to the task list.
- Tags: Categorize tasks using tags for easy organization and filtering.
- Productivity Statistics: Track and visualize productivity statistics, including completed tasks, Pomodoro sessions, and time spent on tasks.
- Settings: Customize app settings such as timer duration, notification preferences, and app theme.
- Drag-and-Drop: Enable intuitive task management through drag-and-drop functionality for reordering tasks.

## Technologies Used

- React: JavaScript library for building user interfaces.
- Redux: State management library for managing application state and data flow.
- TypeScript: Superset of JavaScript that provides static typing and improved tooling.
- Vite: Fast build tooling for modern web development.
- MUI (Material-UI): React component library for building visually appealing and responsive user interfaces.
- Drag-and-Drop Library: Library or framework used for implementing the drag-and-drop functionality (e.g., react-beautiful-dnd).

## Usage Examples

**Homepage:**

![image](https://github.com/WichoGZF/jito/assets/27252445/47a96e42-b55c-4728-ac13-64e700b2e232)

**Settings:**

![image](https://github.com/WichoGZF/jito/assets/27252445/5cd4cbd2-43b0-4739-94af-a4d0806bc4e1)

**Statistics:**

![image](https://github.com/WichoGZF/jito/assets/27252445/45a1d04a-f528-453d-9069-3f0bbb9287ca)


## Installation Instructions

1. Clone the repository: `git clone https://github.com/WichoGZF/jito.git`
2. Navigate to the project directory: `cd jito`
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`
5. Access the application locally via: `http://localhost:3000`

## Code Structure and Organization

The project's codebase is organized as follows:
```plaintext 
  ├── src/
  │ ├── assets/ # Contains images.
  │ ├── components/ # Contains container components used through the application. Grouped by feature and section.
  │ ├── features/ # Redux slices and API thunks. 
  │ ├── hooks/ # Custom hooks and TS wrapper functions around Redux's dispatch and selector.
  │ ├── sounds/ # Contains notification sounds.
  │ ├── types/ # Contains TypeScript type definitions
  │ ├── App.tsx # Entry point of the application
  │ ├── index.tsx # Initializes the React application
  │ └── ...
  ├── public/ # Contains public assets and index.html
  └── ...
```
