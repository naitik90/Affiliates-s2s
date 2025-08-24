INSERT INTO affiliates (id, name) VALUES
  (1, 'Alice Affiliate'),
  (2, 'Bob Partner')
ON CONFLICT DO NOTHING;

INSERT INTO campaigns (id, name, payout, currency) VALUES
  (10, 'Ecom Trial', 25, 'USD'),
  (11, 'Crypto Offer', 50, 'USD')
ON CONFLICT DO NOTHING;
