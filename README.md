# E-Commerce Website

This is an e-commerce website built using React.js for the frontend and Node.js with Express for the backend. The data is stored in a MongoDB database, and Redis is used for caching.

## Features

- User registration and authentication
- Product catalog with search and filtering options
- Shopping cart functionality

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- npm
- Docker
- Docker Compose

## Getting Started

1. Clone the repository:

```
git clone https://github.com/Yehya403/e-commerce-website.git
```

2. Navigate to the project directory:

```
cd e-commerce-website
```

3. Install dependencies for both frontend and backend:

```
cd Frontend-Server
npm install
cd ../Backend-Server
npm install
```

4. Set up environment variables:

Create a `.env` file in the `backend` directory and provide the necessary environment variables such as database connection URL, Redis connection details, etc.

5. Start the development servers:

```
cd ../Frontend-Server
npm start

cd ../Backend-Server
npm run dev
```

6. Access the website in your browser:

Open your browser and visit `http://localhost:3000` to view the e-commerce website.

## Dockerized Deployment

1. Build the Docker images:

```
docker-compose build
```

2. Start the Docker containers:

```
docker-compose up
```

3. Access the website in your browser:

Open your browser and visit `http://localhost:3000` to view the e-commerce website running in a Docker container.

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.
