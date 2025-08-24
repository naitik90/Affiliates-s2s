CREATE TABLE IF NOT EXISTS affiliates (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS campaigns (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  payout NUMERIC(12,2) DEFAULT 0,
  currency TEXT DEFAULT 'USD'
);

CREATE TABLE IF NOT EXISTS clicks (
  id SERIAL PRIMARY KEY,
  affiliate_id INT NOT NULL REFERENCES affiliates(id),
  campaign_id INT NOT NULL REFERENCES campaigns(id),
  click_id TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT uniq_click UNIQUE (affiliate_id, campaign_id, click_id)
);

CREATE TABLE IF NOT EXISTS conversions (
  id SERIAL PRIMARY KEY,
  click_id INT NOT NULL REFERENCES clicks(id),
  amount NUMERIC(12,2) NOT NULL,
  currency TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);
