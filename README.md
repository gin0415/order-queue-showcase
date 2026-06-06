# Restaurant Order Management App

This project is a simple restaurant order management system built with React, Redux, and styled-components. It allows different user roles (Manager, User, VIP) to interact with orders and manage bots.

## Features

- **Role Selection**: Choose your role as Manager, User, or VIP.
- **Order Placement**:
  - Users can place normal orders.
  - VIPs can place VIP orders.
- **Bots Management** (Manager only):
  - Add or remove bots that process pending orders.
- **Order Status**:
  - View all pending orders and their statuses.
  - VIP orders are highlighted.
  - See which bot is processing an order (if any).

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 12+)
- [npm](https://www.npmjs.com/)

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

### Running the App

To start the development server:

```bash
npm start
```

This will open the app at [http://localhost:3000](http://localhost:3000) in your default browser.

The app will reload automatically if you make changes to the code.

### Running Tests

To run tests in interactive watch mode:

```bash
npm test
```

### Building for Production

To build the app for production:

```bash
npm run build
```

This will create a `build` folder with optimized production-ready files.

## Usage Steps

1. **Select Your Role:** At the top of the app, choose Manager, User, or VIP.
2. **Place Orders:**
   - As a User, click "New Normal Order".
   - As a VIP, click "New VIP Order".
   - As a Manager, you can also add or remove bots.
3. **Manage Bots:** If you're a Manager, use the +Bot and -Bot buttons.
4. **View & Track Orders:** Pending orders, their type, and processing status are shown in the application.

---

Feel free to customize and expand functionality as needed!
