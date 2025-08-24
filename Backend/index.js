const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();

// ✅ Enable CORS for frontend (http://localhost:3000)
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  })
);

// ✅ Database connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "s2s_mvp",
  password: "postgres", // match with your docker-compose.yml
  port: 5432,
});

// ✅ CLICK endpoint
app.get("/click", async (req, res) => {
  const { affiliate_id, campaign_id, click_id } = req.query;
  try {
    await pool.query(
      "INSERT INTO clicks (affiliate_id, campaign_id, click_id) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING",
      [affiliate_id, campaign_id, click_id]
    );
    res.json({ status: "success", message: "Click tracked" });
  } catch (err) {
    console.error("Error inserting click:", err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

// ✅ POSTBACK endpoint
app.get("/postback", async (req, res) => {
  const { affiliate_id, click_id, amount, currency } = req.query;
  try {
    const click = await pool.query(
      "SELECT id FROM clicks WHERE affiliate_id=$1 AND click_id=$2",
      [affiliate_id, click_id]
    );

    if (click.rowCount === 0) {
      return res.json({ status: "error", message: "Invalid click" });
    }

    await pool.query(
      "INSERT INTO conversions (click_id, amount, currency) VALUES ($1, $2, $3)",
      [click.rows[0].id, amount, currency]
    );

    res.json({ status: "success", message: "Conversion tracked" });
  } catch (err) {
    console.error("Error inserting conversion:", err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

// ✅ CONVERSIONS endpoint
app.get("/conversions", async (req, res) => {
  const { affiliate_id } = req.query;

  if (!affiliate_id) {
    return res.status(400).json([]);
  }

  try {
    const result = await pool.query(
      `SELECT c.id, c.amount, c.currency, c.timestamp
       FROM conversions c
       JOIN clicks cl ON c.click_id = cl.id
       WHERE cl.affiliate_id = $1
       ORDER BY c.timestamp DESC`,
      [affiliate_id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching conversions:", err);
    res.status(500).json([]);
  }
});

// ✅ NEW: CLICKS endpoint
app.get("/clicks", async (req, res) => {
  const { affiliate_id } = req.query;

  if (!affiliate_id) {
    return res.status(400).json([]);
  }

  try {
    const result = await pool.query(
      `SELECT id, campaign_id, click_id, timestamp
       FROM clicks
       WHERE affiliate_id = $1
       ORDER BY timestamp DESC`,
      [affiliate_id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching clicks:", err);
    res.status(500).json([]);
  }
});

// ✅ NEW: STATS endpoint
app.get("/stats", async (req, res) => {
  const { affiliate_id } = req.query;

  if (!affiliate_id) {
    return res.status(400).json({ error: "affiliate_id is required" });
  }

  try {
    const clicks = await pool.query(
      "SELECT COUNT(*) FROM clicks WHERE affiliate_id = $1",
      [affiliate_id]
    );

    const conversions = await pool.query(
      `SELECT COUNT(*) AS conv_count, COALESCE(SUM(amount), 0) as revenue 
       FROM conversions c 
       JOIN clicks cl ON c.click_id = cl.id 
       WHERE cl.affiliate_id = $1`,
      [affiliate_id]
    );

    const totalClicks = parseInt(clicks.rows[0].count, 10);
    const totalConversions = parseInt(conversions.rows[0].conv_count, 10);
    const revenue = parseFloat(conversions.rows[0].revenue);

    const conversionRate =
      totalClicks > 0 ? ((totalConversions / totalClicks) * 100).toFixed(2) : 0;

    res.json({
      totalClicks,
      totalConversions,
      conversionRate,
      revenue,
    });
  } catch (err) {
    console.error("Error fetching stats:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ ROOT endpoint
app.get("/", (req, res) => {
  res.send("Affiliate S2S Tracking Backend is running 🚀");
});

// ✅ Start server
app.listen(4000, () => {
  console.log("Backend running at http://localhost:4000");
});
