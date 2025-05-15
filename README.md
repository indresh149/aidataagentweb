# AI Data Agent - SQL Analytics Interface

An advanced AI-powered conversational interface that answers complex business questions from SQL databases with natural language responses and interactive visualizations.

## Features

- Natural language query interface for complex analytical questions
- Advanced SQL query generation from natural language
- Interactive data visualizations with charts and tables
- Context-aware responses that remember conversation history
- Schema inference for handling complex and poorly structured databases
- Dark/light mode for extended analysis sessions

## Technologies Used

- **Frontend**: React, TailwindCSS, Chart.js
- **Backend**: Node.js, Express
- **Database**: SQLite with sample business data
- **Visualization**: Chart.js, React-Chartjs-2
- **Utilities**: SQL-formatter, date-fns

## Example Questions

The AI Data Agent can handle complex analytical questions such as:

1. "What's the revenue trend for the last 6 months broken down by product category?"
2. "Who are our top 10 customers by total purchase value?"
3. "Compare sales performance across different regions"
4. "Which products have the highest profit margin but lowest sales volume?"
5. "Show me the monthly revenue growth rate for each region"

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- NPM or Yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/ai-data-agent.git
cd ai-data-agent
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev:all
```

This will start both the frontend and backend servers. The frontend will be available at http://localhost:5173 and the backend at http://localhost:3001.

## Architecture

The system consists of the following components:

1. **Chat Interface**: Allows users to input natural language questions and displays responses
2. **Query Analyzer**: Processes natural language questions to determine intent and parameters
3. **SQL Generator**: Converts analyzed queries into SQL statements
4. **Visualization Engine**: Automatically selects and generates appropriate visualizations
5. **Response Generator**: Creates comprehensive natural language answers with embedded visualizations

## Data Model

The sample database includes the following tables:

- **Products**: Information about the products being sold
- **Customers**: Customer details including segmentation
- **Orders**: Transaction header information
- **Order Items**: Line items for each order

This structure allows for complex analytical queries across multiple dimensions.

## License

This project is licensed under the MIT License - see the LICENSE file for details.