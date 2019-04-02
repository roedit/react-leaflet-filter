# react-mapbox
- [react-mapbox](#react-mapbox)
  - [Introduction](#introduction)
  - [Quick Start](#quick-start)
  - [Documentation](#documentation)
    - [Folder structure](#folder-structure)
    - [Development steps](#development-steps)

## Introduction

This project was built with [simple-react-full-stack](https://github.com/crsandeep/simple-react-full-stack) boilerplate.

This is a simple [React](https://reactjs.org/) application with a [Node.js](https://nodejs.org/en/) and [Express](https://expressjs.com/) backend. 
The UI it's using [Material-ui](https://material-ui.com/), grafs are displayed using [Recharts](http://recharts.org/en-US/) and [Redux](https://redux.js.org/introduction/getting-started) for the state management.
Map it's displayed using [React-map-gl](https://github.com/uber/react-map-gl).
The application is configured with [Airbnb's ESLint rules](https://github.com/airbnb/javascript) and formatted through [prettier](https://prettier.io/).

## Quick Start

```bash
# Clone the repository
git clone https://github.com/roedit/react-mapbox

# Go inside the directory
cd react-mapbox

# Install dependencies
yarn (or npm install)

# Start development server
yarn dev (or npm run dev)

# Build for production
yarn build (or npm run build)

# Start production server
yarn start (or npm start)
```

## Documentation

### Folder Structure

All the source code will be inside **src** directory. Inside src, there is client and server directory. 
All the frontend code (react, css, js and any other assets) will be in client directory. 
The client forder is fallowing the redux folder structure - actions | reducers 
Backend Node.js/Express code will be in the server directory.
We load the boat_ramps.geojson content to serve the client for data

### Development Steps
1 Create the project structure 
2 Setup the material ui layout
3 Display the map
4 Display the charts
5 Filter data based on viewport