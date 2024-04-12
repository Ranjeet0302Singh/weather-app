# MyWeatherApp

Welcome to MyWeatherApp - your go-to destination for accurate weather forecasts worldwide.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the App](#running-the-app)
    - [Building for Production](#building-for-production)
4. [Configuration](#configuration)
    - [Environment Variables](#environment-variables)
5. [Data Sources](#data-sources)
6. [Acknowledgments](#acknowledgments)

## Introduction

MyWeatherApp is a weather forecast application built using Next.js, TypeScript, and Tailwind CSS. It provides real-time weather updates for any location in the world, empowering users with accurate forecasts to plan their day effectively.

## Features

### Real-Time Weather Data

Stay informed with up-to-date weather forecasts for your current location or any place worldwide.

### Country Information

Explore detailed information about various countries, including name, population count, and timezones.

### Location-Based Forecast

Automatically fetch weather data based on your selected country or your device's current location.

### Search Functionality

Easily search for any location and monitor its weather forecast, including a 7-day outlook.

### Responsive Design

Enjoy a seamless user experience across devices of all sizes, from smartphones to desktops.

## Getting Started

### Prerequisites

Ensure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Ranjeet0302Singh/weather-app.git
```
## Getting Started

### Installation

1. **Navigate into the project directory:**

    ```bash
    cd weather-app
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

### Running the App

1. **Start the development server:**

    ```bash
    npm run dev
    ```

2. **Open your browser and visit [http://localhost:3000](http://localhost:3000) to view the app.**

### Building for Production

To build the app for production, run:

```bash
npm run build
```
## Building for Production

This will create an optimized production build in the `./build` directory.

## Configuration

### Environment Variables

To configure the app, set the following environment variable:

- `API_KEY`: Your API key for accessing the OpenWeather API.

Create a `.env.local` file in the root directory and add your API key:

```plaintext
NEXT_PUBLIC_WEATHER_KEY=your_openweather_api_key_here
```

## Data Sources

- **Country Data**: MyWeatherApp fetches country data from the OpenDataSoft API, providing information about various countries.
  **API** :https://www.google.com/url?q=https://public.opendatasoft.com/explore/dataset/geonames-all-cities-with-a-population-1000/table/?disjunctive.cou_name_en%26sort%3Dname&sa=D&source=editors&ust=1712937433305377&usg=AOvVaw3HYNb0yk4_GNnbTcjko9Jo
- **Weather Data**: Weather details are obtained from the OpenWeather API, offering real-time weather forecasts for locations worldwide.
  **API** : https://api.openweathermap.org/data/2.5/weather?q=London&APPID=NEXT_PUBLIC_WEATHER_KEY

## Acknowledgments

- Built with Next.js, TypeScript, and Tailwind CSS.
- Additional libraries used include Axios, Date-fns, Framer Motion, Jotai, React Icons, and React Query.

