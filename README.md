```markdown
# Real-Time Analytics API using Node.js and Redis

This project demonstrates the implementation of a real-time analytics API using Node.js and Redis. The API allows you to receive real-time events when a user opens an email and aggregates the events to provide analytics data.

## Features

- Two API endpoints: `/events` for receiving real-time events and `/metrics` for aggregated analytics data.
- Stores events data in a Redis Caching (Ordered set respect with time).
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

Example event payload: https://gist.github.com/ferreiro/5a660040de7c13f7f24e1b75a2f9b20f#file-opened_events-json

### GET /metrics

Returns an aggregated view of the events data including timeseries. ![example](https://json-parser.com/49fdda45/1)

Example response: {
    "_id": "64e787757a237a65c7a19d86",
    "open_by_countries": [
        {
            "country": "US",
            "count": 2,
            "_id": "64e787757a237a65c7a19d87"
        },
        {
            "country": "IN",
            "count": 1,
            "_id": "64e788af2e3bad93b229f1ca"
        }
    ],
    "open_by_devices": [
        {
            "deviceType": "Mobile",
            "count": 2,
            "_id": "64e787757a237a65c7a19d88"
        },
        {
            "deviceType": "iPhone",
            "count": 1,
            "_id": "64e788b02e3bad93b229f1cd"
        }
    ],
    "timestamps": [
        {
            "totalOpens": 3,
            "time": "2023-08-24T16:38:00.000Z",
            "_id": "64e787757a237a65c7a19d89"
        }
    ],
    "__v": 0
}

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
