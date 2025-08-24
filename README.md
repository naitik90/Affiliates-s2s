# Affiliate S2S Postback MVP

A minimal **Server-to-Server (S2S) tracking system** for affiliate conversions. Tracks clicks, records conversions, and provides a dashboard for affiliates to monitor performance.

---

## Overview
In affiliate marketing, **S2S postbacks** let advertisers notify affiliate systems directly when a conversion occurs, bypassing browser cookies or pixels.

**Example Flow:**

1. **User clicks an affiliate link:**
- Click is stored in the database.

2. **User makes a purchase; advertiser fires postback:**
GET /postback?affiliate_id=1&click_id=abc123&amount=100&currency=USD

- System validates the click and logs the conversion.

3. **Affiliate dashboard** displays clicks and conversions.

---

## Tech Stack
- **Backend:** Node.js + Express  
- **Frontend:** Next.js + Tailwind CSS  
- **Database:** PostgreSQL (Docker)

---

## Features
- Track clicks with affiliate_id, campaign_id, click_id, and timestamp.  
- Postback endpoint to log conversions securely.  
- Affiliate dashboard to view clicks, conversions, and revenue.  
- Unique postback URL per affiliate:


https://affiliate-system.com/postback?affiliate_id={id}&click_id={click_id}&amount={amount}&currency={currency}


---

## Database Schema
**Tables:**

- `affiliates` → id (PK), name  
- `campaigns` → id (PK), name  
- `clicks` → id (PK), affiliate_id (FK), campaign_id (FK), click_id (unique), timestamp  
- `conversions` → id (PK), click_id (FK), amount, currency, timestamp  

---

## Setup

### 1. Clone Repository
```bash
git clone https://github.com/your-username/affiliate-s2s-mvp.git
cd affiliate-s2s-mvp

2. Start PostgreSQL
docker compose up -d
docker exec -i s2s_mvp_db psql -U postgres -d s2s_mvp < schema.sql
docker exec -i s2s_mvp_db psql -U postgres -d s2s_mvp < seed.sql

3. Run Backend
cd backend
npm install
npm run dev

4. Run Frontend
cd frontend
npm install
npm run dev

API Endpoints
Click
GET /click
Query Parameters:
- affiliate_id (int)
- campaign_id (int)
- click_id (string)

Postback
GET /postback
Query Parameters:
- affiliate_id (int)
- click_id (string)
- amount (float)
- currency (string)


Responses:

Success: { "status": "success", "message": "Conversion tracked" }

Error (invalid click): { "status": "error", "message": "Invalid click" }

Affiliate Dashboard

Select affiliate (simulated login)

View clicks and conversions per campaign

Displays affiliate-specific postback URL format

Deliverables

Click endpoint

Postback endpoint

PostgreSQL database schema

Affiliate dashboard

Unique postback URL generation

README with setup instructions and example API requests

License

MIT License


---


