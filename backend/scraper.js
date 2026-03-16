// =====================================================
// scraper.js — Fixed Version with Stealth Mode
//
// SETUP (run these commands first):
// npm install puppeteer-extra puppeteer-extra-plugin-stealth
//
// THEN RUN:
// node scraper.js
// =====================================================

const puppeteer      = require("puppeteer-extra");
const StealthPlugin  = require("puppeteer-extra-plugin-stealth");
const mongoose       = require("mongoose");
const Property       = require("./models/Property");

// Use stealth plugin — hides bot signals
puppeteer.use(StealthPlugin());

mongoose
  .connect("mongodb://127.0.0.1:27017/rentalDB")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

// ── Cities to scrape ─────────────────────────────
const CITIES = [
  { name: "Mumbai",    url: "mumbai"    },
  { name: "Delhi",     url: "delhi"     },
  { name: "Bangalore", url: "bangalore" },
  { name: "Hyderabad", url: "hyderabad" },
  { name: "Pune",      url: "pune"      },
  { name: "Chennai",   url: "chennai"   },
  { name: "Jaipur",    url: "jaipur"    },
  { name: "Kolkata",   url: "kolkata"   },
];

// ── Helpers ───────────────────────────────────────
function randomDelay(min = 1000, max = 3000) {
  return new Promise((r) =>
    setTimeout(r, Math.floor(Math.random() * (max - min) + min))
  );
}

function mapType(text = "") {
  const t = text.toLowerCase();
  if (t.includes("villa"))                                           return "Villa";
  if (t.includes("pg") || t.includes("hostel") || t.includes("guest house")) return "PG/Hostel";
  if (t.includes("office") || t.includes("commercial") || t.includes("shop") || t.includes("showroom")) return "Commercial";
  if (t.includes("house") || t.includes("bungalow") || t.includes("independent")) return "House";
  if (t.includes("room") && !t.includes("bedroom"))                 return "Room";
  return "Apartment";
}

function cleanPrice(text = "") {
  if (!text) return 0;
  const lower = text.toLowerCase();
  const num   = parseFloat(text.replace(/[^0-9.]/g, "")) || 0;
  if (lower.includes("l"))   return Math.round(num * 100000);
  if (lower.includes("k"))   return Math.round(num * 1000);
  return Math.round(num);
}

// ── Scrape one city from MagicBricks ─────────────
async function scrapeCity(browser, city) {
  const url = `https://www.magicbricks.com/property-for-rent/residential-real-estate?proptype=Multistorey-Apartment,Builder-Floor-Apartment,Penthouse,Studio-Apartment,1-RK-Studio-Apartment,Residential-House,Villa,Residential-Plot&cityName=${city.url}`;

  console.log(`\n🔍 Scraping ${city.name}...`);

  const page = await browser.newPage();

  // Random viewport — looks more human
  await page.setViewport({
    width:  1280 + Math.floor(Math.random() * 100),
    height: 800  + Math.floor(Math.random() * 100),
  });

  // Realistic user agent
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
  );

  try {
    await page.goto(url, { waitUntil: "networkidle2", timeout: 45000 });

    // Wait a bit like a human would
    await randomDelay(2000, 4000);

    // Human-like scroll
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let scrolled = 0;
        const timer = setInterval(() => {
          const step = 200 + Math.random() * 200;
          window.scrollBy(0, step);
          scrolled += step;
          if (scrolled >= 4000) { clearInterval(timer); resolve(); }
        }, 300);
      });
    });

    await randomDelay(1500, 2500);

    // Check if blocked
    const pageContent = await page.content();
    if (
      pageContent.includes("captcha") ||
      pageContent.includes("Access Denied") ||
      pageContent.includes("blocked")
    ) {
      console.log(`   ⚠️  Blocked on ${city.name} — skipping`);
      await page.close();
      return [];
    }

    // Try multiple selectors — MagicBricks changes them often
    const results = await page.evaluate((cityName) => {
      const data = [];

      // Try different card selectors
      const selectors = [
        ".mb-srp__list--card",
        ".m-srp-card",
        "[data-qa='srpCard']",
        ".srpCard",
        ".card__property",
        "article",
        ".result",
        ".listing-card",
      ];

      let cards = [];
      for (const sel of selectors) {
        const found = document.querySelectorAll(sel);
        if (found.length > 0) {
          cards = [...found];
          console.log("Found with selector:", sel);
          break;
        }
      }

      cards.forEach((card) => {
        try {
          // Title — try many selectors
          const titleEl = card.querySelector(
            "h2, h3, .mb-srp__card--title, .title, [data-qa='card-title'], .propertyName, .prop-name"
          );
          const title = titleEl?.innerText?.trim();
          if (!title || title.length < 4) return;

          // Price
          const priceEl = card.querySelector(
            ".mb-srp__card__price--amount, .price, [data-qa='price'], .amount, .cost, .rent"
          );
          const priceText = priceEl?.innerText?.trim() || "0";

          // Description
          const descEl = card.querySelector(
            ".mb-srp__card--desc, .desc, [data-qa='card-desc'], .description, .summary, .overview"
          );
          const description =
            descEl?.innerText?.trim() || `Property for rent in ${cityName}`;

          // Image
          const imgEl = card.querySelector("img");
          const image =
            imgEl?.src ||
            imgEl?.getAttribute("data-src") ||
            imgEl?.getAttribute("data-lazy") ||
            "";

          // Locality
          const locEl = card.querySelector(
            ".mb-srp__card--locality, .locality, .location, [data-qa='locality']"
          );
          const locality = locEl?.innerText?.trim() || cityName;

          data.push({ title, priceText, description, image, cityName, locality });
        } catch (e) {}
      });

      return data;
    }, city.name);

    console.log(`   ✅ Found ${results.length} listings on ${city.name}`);
    await page.close();
    return results;

  } catch (err) {
    console.log(`   ❌ Error on ${city.name}: ${err.message}`);
    await page.close();
    return [];
  }
}

// ── Save scraped data to MongoDB ──────────────────
async function saveToDb(rawList) {
  const fallbacks = [
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  ];

  let saved = 0;
  for (const raw of rawList) {
    try {
      const price = cleanPrice(raw.priceText);
      if (price < 1000 || price > 2000000) continue; // skip unrealistic prices

      const image =
        raw.image && raw.image.startsWith("http")
          ? raw.image
          : fallbacks[Math.floor(Math.random() * fallbacks.length)];

      await new Property({
        title:       raw.title,
        city:        raw.cityName,
        type:        mapType(raw.title),
        price:       price,
        description: raw.description,
        image:       image,
      }).save();

      saved++;
    } catch (e) {
      // skip duplicates silently
    }
  }
  return saved;
}

// ── Main ──────────────────────────────────────────
async function main() {
  console.log("🚀 Starting scraper with Stealth Mode...");
  console.log("⏳ Browser will open — DO NOT close it!\n");

  const browser = await puppeteer.launch({
    headless: false,   // ← Show browser — helps bypass detection
    defaultViewport: null,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--start-maximized",
    ],
  });

  let all = [];

  for (const city of CITIES) {
    const results = await scrapeCity(browser, city);
    all = [...all, ...results];

    // Wait between cities
    console.log(`   ⏳ Waiting 5 seconds before next city...`);
    await randomDelay(5000, 8000);
  }

  await browser.close();

  console.log(`\n📊 Total scraped: ${all.length}`);
  console.log("💾 Saving to MongoDB...\n");

  const saved = await saveToDb(all);
  const total = await Property.countDocuments();

  console.log(`✅ Saved: ${saved} new properties`);
  console.log(`📊 Total in DB: ${total}`);
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Fatal:", err.message);
  process.exit(1);
});
