# Career Flavour Documentation

## Overview
Career Flavour is a platform designed for creating resumes. It provides users with tools to customize and design their resumes, offering features such as layout selection, font customization, and section management. The application is still in development but is usable, providing users with the ability to create and edit resumes.

### Demo
A live demo of Career Flavour is available at [Career Flavour Demo](https://career-flavour.web.app/home).

## Features
- **Resume Editor**: Users can access an intuitive editor interface to customize and design their resumes. The editor provides tools for adding, removing, and formatting text, as well as managing different sections of the resume.
- **Layout Selector**: Allows users to drag and drop different resume sections and position them within a CSS grid layout. This feature provides flexibility in arranging resume content to suit individual preferences.
- **Font Selector**: Enables users to change and apply different fonts to their resume text. Users can choose from a selection of pre-defined fonts or upload custom fonts to personalize their resumes further.
- **Section Management**: Users can add, remove, and manage different sections of their resume. This feature allows users to tailor their resumes to highlight their skills, experience, and achievements effectively.
- **Editable Text**: Utilizes editable `<pre>` elements, allowing users to click on the page text and directly write or edit. This feature provides a seamless editing experience, allowing users to make changes to their resumes quickly and easily.

## Architecture Overview
Career Flavour follows a modular architecture, allowing for easy integration and customization. The project is organized into various modules, each serving a specific purpose.

### Modules
1. **Core Module**: Contains core components such as the homepage and navigation. This module provides the foundation for the application's user interface and navigation.
2. **Resume Builder Module**: Provides components and services for building and customizing resumes. This module includes the resume editor, layout selector, font selector, and section management features.
3. **Resume Templates Module**: Includes components for managing and selecting resume templates. This module provides users with a selection of pre-designed resume templates to choose from.
4. **User Module**: Handles user authentication and profile management. This module provides features for user registration, login, and profile customization.
5. **Shared Module**: Contains shared components and utilities used across the application. This module includes common components, services, and directives used throughout the application.

### Services
- **Firebase Services**: Utilizes Firebase Firestore for database functionality and Firebase Authentication for user authentication. These services provide the backend infrastructure for storing user data and managing user authentication.
- **Event Buses**: Implements two event buses for passing data and delegating global event listeners. These event buses facilitate communication between different components and modules within the application.

### Styling
The styling of Career Flavour is entirely original, created by the developer. It provides a unique and consistent visual experience throughout the application.

## Getting Started
To run Career Flavour locally, follow these steps:

1. Clone the repository:
git clone <repository-url>

2. Navigate to the project directory:
cd career-flavour

3. Install dependencies:
npm install

4. Run the development server:
ng serve

5. Open your browser and navigate to [http://localhost:4200/](http://localhost:4200/). You should see the Career Flavour application running locally on your machine.

## Deployment
Career Flavour is designed to be easily deployed. Simply build the project using `ng build`, and deploy the generated artifacts to your preferred hosting platform.

## Error Handling
The application features a global error handler that captures and logs errors. 
