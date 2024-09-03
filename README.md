# MealMapper

MealMapper is a project aimed at helping with meal planning and management by allowing users to register foods and calculate the nutritional information of complete meals. This repository contains both the backend, developed in Golang, and the frontend, developed in React with Vite.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)

## About

MealMapper is an application that allows users to register foods with detailed nutritional information and use these registered foods to create meals. The application calculates the total nutritional information of meals based on the selected foods and quantities. Although it is more basic than FatSecret, it offers essential functionality for those looking to track nutritional intake in a practical and efficient way.

## Features

- **Food Registration:** Allows the entry of foods with detailed nutritional information.
- **Meal Creation:** Uses registered foods to create meals.
- **Nutritional Calculation:** Provides total nutritional information of meals based on the selected foods and quantities.
- **Modern Frontend:** Interface developed with React and Vite, using Bootstrap 5.2 for styling.

## Installation

### Requirements

Before starting, make sure you have the following versions installed:

- **Golang:** 1.23.0
- **Node.js:** 22.6.0

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
