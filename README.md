# Affiliate S2S Postback MVP

A minimal **Server-to-Server (S2S) postback tracking system** for affiliate conversions. Tracks clicks, records conversions, and provides a dashboard for affiliates.

---

## Overview
In affiliate marketing, **S2S postbacks** allow advertisers to notify affiliate systems directly when a conversion occurs, without relying on browser cookies or pixels.

**Flow:**
1. User clicks an affiliate link:
GET /click?affiliate_id=1&campaign_id=10&click_id=abc123

2. Affiliate system stores the click.
3. User makes a purchase; advertiser fires postback:


GET /postback?affiliate_id=1&click_id=abc123&amount=100&currency=USD

4. Conversion is validated, stored, and displayed in affiliate dashboard.

---

## Tech Stack
- **Backend:** Node.js + Express  
- **Frontend:** Next.js + Tailwind CSS  
- **Database:** PostgreSQL (Docker)

---

## Features
- Click tracking with affiliate_id, campaign_id, click_id, timestamp.  
- Postback endpoint to log conversions securely.  
- Affiliate dashboard to view clicks and conversions.  
- Unique postback URL format for each affiliate.

---

## Setup

### 1. Clone repository
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
Query parameters:
- affiliate_id (int)
- campaign_id (int)
- click_id (string)

Postback
GET /postback
Query parameters:
- affiliate_id (int)
- click_id (string)
- amount (float)
- currency (string)


Responses:

Success: { "status": "success", "message": "Conversion tracked" }

Error (invalid click): { "status": "error", "message": "Invalid click" }

Affiliate Dashboard

Simulated login: select your affiliate.

View clicks and conversions under campaigns.

Displays affiliate-specific postback URL format:

https://affiliate-system.com/postback?affiliate_id={id}&click_id={click_id}&amount={amount}&currency={currency}

