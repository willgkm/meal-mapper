# MealMapper

MealMapper is a project aimed at helping with meal planning and management by allowing users to register foods and calculate the nutritional information of complete meals. This repository contains both the backend, developed in Golang, and the frontend, developed in React with Vite.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)

## About

MealMapper is an application that allows users to register foods with detailed nutritional information and create meals using these registered foods. The application calculates the total nutritional information of meals based on selected foods and their respective quantities. MealMapper provides essential functionality for tracking nutritional intake in an efficient and user-friendly manner.

## Features

- **Food Registration:** Register foods with comprehensive nutritional information.
- **Meal Creation:** Assemble meals using registered foods.
- **Nutritional Calculation:** Automatically calculate the total nutritional content of meals based on selected foods and quantities.
- **Modern Frontend:** A user interface built with React and Vite, styled with Bootstrap 5.2.
- **Local Database:** Utilizes SQLite3 to provide a local database within the user's application, ensuring data persistence and easy access.

## Installation

### Requirements

Before starting, make sure you have the following versions installed:

- **Golang:** 1.23.0
- **Node.js:** 22.6.0
- **SQLite3 :** 3.46.1

First this is to clone the repository 

1. Clone the repository:

   ```bash
   git clone https://github.com/willgkm/meal-mapper

### Backend

To set up and run the backend of MealMapper, follow these steps:

1. Navigate to the backend directory :

   ```bash
    cd MealMapper/backend

2. Run the project :

   ```bash
    go run ./main.go

### Frontend

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

## Features

- **Food Registration:** Add foods with detailed nutritional information.
- **Meal Creation:** Create meals using registered foods and view total nutritional info.
- **Viewing Results:** Check meal nutritional information through the frontend interface.
