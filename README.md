Affiliate S2S Tracking MVP
This project is a minimal, yet functional, Server-to-Server (S2S) tracking system for affiliate marketing conversions, built with Node.js, Express, PostgreSQL, and Next.js.

Overview
In affiliate marketing, S2S tracking (or postback tracking) is a reliable method for recording conversions. Instead of relying on browser-based tracking like cookies, the advertiser's server sends a direct notification to the affiliate's system when a conversion occurs. This MVP simulates that core functionality.

How It Works
Click Event: An affiliate drives traffic to a campaign via a unique tracking link. Our system logs this click event, associating a unique click_id with the affiliate_id and campaign_id.

GET /click?affiliate_id=1&campaign_id=10&click_id=abc123

Conversion Event: When the user completes a desired action (e.g., a purchase), the advertiser's server sends a "postback" request to our system, referencing the original click_id.

GET /postback?affiliate_id=1&click_id=abc123&amount=100&currency=USD

Validation & Reporting: The system validates that the click_id is legitimate, records the conversion, and displays the data on the affiliate's dashboard.

Tech Stack
Backend: Node.js, Express

Frontend: Next.js, Tailwind CSS

Database: PostgreSQL (managed with Docker)

Features
Click Tracking: Endpoint to log all incoming affiliate clicks.

S2S Postback Handling: Secure endpoint to receive conversion notifications from advertisers.

Click Validation: Ensures that conversions are only recorded for valid, previously tracked clicks.

Affiliate Dashboard: A simple interface for affiliates to view their recorded conversions and earnings.

Dynamic Postback URL: A dedicated page showing each affiliate their unique postback URL format.

Local Setup and Installation
Follow these steps to get the project running on your local machine.

1. Prerequisites
Node.js (v18 or later recommended)

Docker and Docker Compose

2. Clone the Repository
git clone <your-repository-url>
cd affiliate-mvp

3. Setup the Database
The project uses Docker to run a PostgreSQL database in a container.

Start the Database Container:

docker compose up -d

This command starts the Postgres server in the background.

Create the Database Schema:
This command executes the schema.sql file, which creates the affiliates, campaigns, clicks, and conversions tables.

docker exec -i s2s_mvp_db psql -U postgres -d s2s_mvp < schema.sql

Seed the Database:
This command populates the tables with initial sample data for testing.

docker exec -i s2s_mvp_db psql -U postgres -d s2s_mvp < seed.sql

4. Install Dependencies & Run
The project is split into a backend and frontend directory. You will need to run them in separate terminal windows.

Terminal 1: Backend Server

cd backend
npm install
npm run dev

The backend server will start, typically on http://localhost:3001.

Terminal 2: Frontend Application

cd frontend
npm install
npm run dev

The Next.js frontend will start, typically on http://localhost:3000.

You can now access the Affiliate Dashboard at http://localhost:3000.

API Endpoints
1. Track a Click
Logs a click from an affiliate for a specific campaign.

URL: /click

Method: GET

Query Parameters:

affiliate_id (integer, required): The ID of the affiliate.

campaign_id (integer, required): The ID of the campaign.

click_id (string, required): A unique identifier for this click, provided by the affiliate.

Example Request:

GET http://localhost:3001/click?affiliate_id=1&campaign_id=101&click_id=xyz987

2. Track a Conversion (Postback)
Logs a conversion based on a previously tracked click.

URL: /postback

Method: GET

Query Parameters:

affiliate_id (integer, required): The ID of the affiliate.

click_id (string, required): The click_id from the original click event.

amount (float, required): The conversion value (e.g., sale amount).

currency (string, required): The currency code (e.g., USD).

Example Request:

GET http://localhost:3001/postback?affiliate_id=1&click_id=xyz987&amount=99.99&currency=USD

Success Response (200 OK):

{
  "status": "success",
  "message": "Conversion tracked successfully"
}

Error Response (404 Not Found):
(If the click_id does not exist or does not match the affiliate_id)

{
  "status": "error",
  "message": "Invalid click_id or affiliate_id"
}
