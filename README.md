# Affiliate S2S Tracking MVP

A minimal **Server-to-Server (S2S) tracking system** for affiliate conversions. This project allows affiliates to track clicks and conversions in real-time.

---

## Table of Contents
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Setup](#setup)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## Overview
The system tracks affiliate clicks and conversions with the following flow:

1. **Click Tracking**  
   ```http
   GET /click?affiliate_id=1&campaign_id=10&click_id=abc123
