```markdown
# Real-Time Analytics API using Node.js and MongoDB

This project demonstrates the implementation of a real-time analytics API using Node.js and MongoDB. The API allows you to receive real-time events when a user opens an email and aggregates the events to provide analytics data.

## Features

- Two API endpoints: `/events` for receiving real-time events and `/metrics` for aggregated analytics data.
- Stores events data in a MongoDB database.
- Aggregates events data including timeseries for various metrics.
- Supports detection of user devices (mobile, tablet, desktop) and country-wise event counts.

## Prerequisites

- Node.js 
- MongoDB
- Redis
- Express

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/real-time-analytics-api.git
   cd real-time-analytics-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and configure your MongoDB connection string:

   ```env
   PORT
   MONGODB_URI=your_mongodb_connection_string
   REDIS_URL
   ```

4. Start the server:

   ```bash
   npm start
   ```

## API Endpoints

### POST /events

Receives real-time analytics events data when a user opens an email.

Example event payload: [Event Payload Example](example_event_payload.json)

### GET /metrics

Returns an aggregated view of the events data including timeseries.

Example response: [Metrics Response Example](example_metrics_response.json)

## Design
![Rough_Desing](https://github.com/rajnsunny/Email_Metrics/blob/main/Screenshot%202023-08-24%20225624.png)

- Redis is used for storing the event_payload temporarily and used as caching.
- This also help us to handle high number of requests per second as It's distributed Sytems designs.
- MongoDB is used for storing the aggregated view of the payload. Hence it only calls interval of 60secs. 

## Improvements
- Performance can be improved as Redis is not handled properly.
- Using proper distributed System concepts It's Performance can be imporved.

## Bugs
- Redis has some connection issues from the Render (Service I have used for Redis and deploying Server).
