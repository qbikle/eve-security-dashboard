# Security Dashboard

This is a security dashboard application built with Next.js 14, designed to graph and tabulate log data from `eve.json` which contains security logs. The dashboard utilizes React Chart.js and Chart.js 2 for graph components, and Acternity UI for the landing page.

## Features

- **Log Data Visualization**: Graph and table representations of security log data.
- **Responsive Design**: Uses Acternity UI for a sleek and responsive landing page.
- **Dynamic Charts**: Interactive and dynamic charts using React Chart.js and Chart.js 2.

## Technologies Used

- **Next.js 14**: Framework for server-rendered React applications.
- **React**: JavaScript library for building user interfaces.
- **Chart.js 2**: JavaScript library for creating charts.
- **React Chart.js 2**: React wrapper for Chart.js.
- **Acternity UI**: UI framework for responsive and modern web design.

## Live Demo

Check out the live demo of the security dashboard deployed on Vercel: [Security Dashboard Live](https://{your-deployment-url}.vercel.app)

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v14 or later)
- **npm** (v6 or later) or **yarn** (v1.22 or later)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/qbikle/eve-security-dashboard.git
   cd security-dashboard
   ```

2. **Install dependencies**:

   Using npm:

   ```bash
   npm install
   ```

   Using yarn:

   ```bash
   yarn install
   ```

### Configuration

1. **Log Data**:

   Ensure your `eve.json` file containing the security logs is available and accessible by the application. Place it in the `data` directory within the project root (or configure the path accordingly).

### Running the Application

1. **Development Mode**:

   To start the development server with hot reloading:

   Using npm:

   ```bash
   npm run dev
   ```

   Using yarn:

   ```bash
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

2. **Production Mode**:

   To build and start the server in production mode:

   Using npm:

   ```bash
   npm run build
   npm start
   ```

   Using yarn:

   ```bash
   yarn build
   yarn start
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
security-dashboard/
├── Components/       # React components for the application
├── App/              # Next.js App
├── public/           # Static assets also includes eve.json
├── README.md         # Project documentation
├── package.json      # Project metadata and dependencies
├── next.config.js    # Next.js configuration
└── ...               # Other configuration and utility files
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with your improvements.

## Acknowledgements

- Thanks to the contributors of Next.js, React, Chart.js, and Acternity UI for their fantastic libraries.
