# Apu Ankka Frontend

Apu Ankka is a web application frontend built with React. It allows users to request and provide simple services to each other while offering a small fee for the services rendered.

![Apu Ankka Logo](public/favicon.ico)


## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Features](#features)
- [Usage](#usage)

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js:** Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).

### Installation

Follow these steps to install and set up the Apu Ankka frontend:

1. Clone the repository:

   ```bash
   git clone https://github.com/ahmedeleven/apuankka-frontend.git
   cd apuankka-frontend
   ```

2. Update the API base URL:

- Open the `config/config.js` file.
- Update the following line with the backend URL if it is different from the default:
  ```javascript
  export const API_BASE_URL = "http://127.0.0.1:8000/api/";
  ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

Now, you should be able to access the Apu Ankka frontend at `http://localhost:3000` in your web browser.

## Features

- User registration and authentication
- Service request creation
- Service listing
- Responsive design for mobile and desktop

## Usage

1. **User Registration:**

- Sign up for an account on the Apu Ankka platform.

2. **Create a Service Request:**

- Log in to your account.
- Click on the "Add Service" button.
- Fill in the details of the service you need and set a fee.
- Submit the request.

3. **Browse and Accept Service Requests:**

- Browse the available service requests on the platform.
- Select a service you want to provide.
- Click on the "Interested" button to offer your service.
- The requester can see the details the users interested in providing help.
- The requester can choose one or multiple users from the list.
