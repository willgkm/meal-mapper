# MealMapper

## YouTube demo: 
[Watch the MealMapper Demo](https://youtu.be/JA5mOvAkFg0)

## Table of Contents

- [About](#about)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [File Descriptions](#file-descriptions)
- [Design Choices](#design-choices)
- [Challenges](#challenges)
- [Contributing](#contributing)

## About

MealMapper is an innovative application designed to assist users in meal planning and nutritional management. By enabling users to register foods and calculate the nutritional information of their meals, MealMapper streamlines the process of tracking dietary intake. The application consists of a robust backend developed in **Golang** and a dynamic frontend built using **React** and **Vite**, offering a modern user experience. 

Users can easily navigate the platform to input food items, create meals, and receive detailed nutritional summaries, all from an intuitive interface that prioritizes user engagement and simplicity.

## Features

- **Food Registration:** Users can register foods with comprehensive nutritional information, including macronutrients and micronutrients, ensuring they have access to accurate dietary data.
- **Meal Creation:** Users can easily assemble meals from their registered foods, allowing for custom meal planning tailored to dietary preferences or restrictions.
- **Nutritional Calculation:** The application automatically calculates the total nutritional content of meals based on selected foods and quantities, providing users with instant feedback on their meal choices.
- **Modern Frontend:** Built with React and Vite, the user interface is responsive and styled with Bootstrap 5.2, ensuring a smooth and visually appealing experience across devices.
- **Local Database:** MealMapper uses SQLite3 for local data storage, providing persistence and easy access to user-generated content without the need for an internet connection.

## Installation

### Requirements

Before starting, make sure you have the following versions installed:

- **Golang:** 1.23.0
- **Node.js:** 22.6.0
- **SQLite3 :** 3.46.1


### Cloning the Repository

1. Clone the repository:

   ```bash
   git clone https://github.com/willgkm/meal-mapper

### Backend Setup

To set up and run the backend of MealMapper, follow these steps:

1. Navigate to the backend directory :

   ```bash
    cd MealMapper/backend

2. Run the project :

   ```bash
    go run ./main.go

- **Backend URL :**  http://localhost:8910/

### Frontend Setup

To set up and run the backend of MealMapper, follow these steps:

1. Navigate to the frontend directory:

   ```bash
    cd MealMapper/frontend/meal-mapper

2. Install dependencies:

   ```bash
    npm install

3. Run the project :

   ```bash
    npm run dev
- **Frontend URL :**  http://localhost:5173/

## Usage

Once both the backend and frontend are running, users can access the MealMapper application through their browser. The user interface guides them through registering foods, creating meals, and viewing nutritional information. Users can experiment with different food combinations to meet their dietary goals.

### Key User Interactions:

- **Registering Foods:** Navigate to the food registration section to input food items, including name, serving size, and nutritional details.
- **Creating Meals:** Select multiple registered foods to create a meal, then view the total nutritional information calculated automatically.
- **Viewing Results:** After creating a meal, users can easily access nutritional summaries, helping them make informed dietary choices.

## File Descriptions

The following section describes the main components of the MealMapper project and highlights the key parts of the challenge I faced during development. Each file serves a specific purpose in the overall architecture, contributing to the functionality and performance of the application.

- **main.go:** The entry point for the backend application, handling API requests and database interactions.
  
- **models.go:** Defines data structures for foods and meals, facilitating data handling and manipulation.

- **routes packege:** This package is responsible for setting up the routing for the application. It uses the Gorilla Mux router to handle incoming HTTP requests and map them to the appropriate controller functions.

  - **SetupRouter:** This function initializes the router and defines the available API endpoints for managing foods and meals. It includes methods for creating, retrieving, updating, and deleting foods and meals. The logging middleware is also applied here to monitor incoming requests and log relevant details.
    
    ```go
    func SetupRouter() *mux.Router {
        router := mux.NewRouter()
        router.Use(loggingMiddleware)
        ...
    }
    ```

  - **Logging Middleware:** A custom middleware that logs the details of each request, including the method, URL, and response status. It helps in tracking API usage and diagnosing issues.
  
  - **CORS Setup:** The `SetupHandler` function configures Cross-Origin Resource Sharing (CORS) settings, allowing your API to accept requests from different origins. This is crucial for frontend applications that need to communicate with the backend, especially when hosted on different domains.
  
    ```go
    func SetupHandler() (func(http.Handler) http.Handler) {
        allowedHeaders := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type"})
        ...
        return handlers.CORS(allowedHeaders, allowedOrigins, allowedMethods)
    }
    ```

- **database.go:** This file manages the connection to the SQLite database. It establishes the database connection and ensures that the required tables are created based on the defined schema.

  - **Connect:** This function opens a connection to the SQLite database (`mealmapper.db`). If an error occurs during the connection, it logs the error and terminates the application.
    
    ```go
    func Connect() {
        var err error
        DB, err = sql.Open("sqlite3", "./mealmapper.db")
        ...
    }
    ```

  - **CreateTables:** This function reads the SQL schema from a file (`schemas.sql`) and executes it to create the necessary tables in the database. It ensures that the database is properly set up for storing food and meal data.
    
    ```go
    func CreateTables() {
        dir, err := os.Getwd()
        ...
    }
    ```


- **App.tsx:** The main component of the React frontend application that sets up routing for the various pages. It utilizes `react-router-dom` for navigation between different views, including the homepage, food registration, and meal management.

  - **Router Setup:** The component wraps the application in a `Router`, defining routes for navigating to different pages. Each route corresponds to a specific component that handles the UI for that path.
  
    ```jsx
    import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
    ...

    
    function App() {
      return ( 
        <Router>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
               <Route path="/food" element={<Foods />} />

               <Route path="/meal" element={<Meals />} />
              ...
            </Routes>
          </main>
        </Router>
      );
    }
    ```

- **meal.tsx:** This component displays a list of meals and calculates their nutritional values. It fetches meal data from the backend and processes it to present the total nutritional intake for each meal.

  - **calculateAmount:** This function iterates through the list of meals, calculating and accumulating nutritional values (calories, carbs, protein, fat, and weight) for each meal based on its associated foods. It also compiles a description of the ingredients used in the meal.
  
    ```jsx
    function calculateAmount(meals: Meal[]) {
      if (meals) {
        meals.forEach((meal) => {
          meal.amountCalories = 0;
          ...
          if (meal.foods !== null && meal.foods!.length > 0) {
            meal.foods!.forEach((food) => {
              ...
            });
          }
        });
      }
      return meals;
    }
    ```

## Design Choices

In developing MealMapper, several design choices were made to ensure the application is user-friendly and efficient:

- **Technology Stack:** The choice of Golang for the backend was driven by its performance and concurrency support, making it ideal for handling multiple requests efficiently. React was selected for the frontend due to its component-based architecture, which promotes reusability and maintainability.
  
- **Database Management:** Initially, SQLite was used for simplicity and local data storage. Future plans include migrating to PostgreSQL for better scalability and advanced features, ensuring the application can grow alongside user needs.

- **User Interface:** Bootstrap was utilized to create a responsive design, ensuring that the application is accessible on various devices. The interface prioritizes ease of navigation, making it simple for users to register foods and create meals.

## Challenges

Throughout the development of MealMapper, several challenges were encountered:

- **Learning Golang:** One of the significant challenges was transitioning to a new programming language. Understanding the idioms and best practices of Golang required time and dedication, but it ultimately broadened my programming skills and knowledge.
  
- **API Integration:** Designing a RESTful API with proper routing and middleware required careful planning to ensure it was efficient and easy to use. Implementing logging and error handling was crucial for debugging and monitoring.

- **Calculating Nutritional Values:** Creating the logic to accurately calculate the nutritional content of meals based on user input posed a challenge. Ensuring that the data was correctly processed and displayed required thorough testing and validation.

## Contributing

Contributions to MealMapper are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and ensure that your code adheres to the project's style guidelines.
4. Test your changes thoroughly.
5. Submit a pull request detailing your changes and the rationale behind them.

