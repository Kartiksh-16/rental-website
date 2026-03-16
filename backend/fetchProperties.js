// =====================================================
// fetchProperties.js
// Apna khud ka data add karne ka smartest tarika
// Command: node fetchProperties.js
// =====================================================

const mongoose = require("mongoose");
const Property = require("./models/Property");

mongoose
  .connect("mongodb://127.0.0.1:27017/rentalDB")
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// ─────────────────────────────────────────────────
// Yahan apni properties add karo — jitni chahiye!
// Bas copy-paste karo ek block aur details badlo
// ─────────────────────────────────────────────────

const newProperties = [

  // ── MUMBAI ──
  {
    title: "2BHK Apartment in Borivali West",
    city: "Mumbai", type: "Apartment", price: 28000,
    description: "Spacious 2BHK in Borivali West near National Park and metro station. Semi-furnished with AC, modular kitchen, and covered parking. Society has gym, garden, and 24/7 security. Great connectivity to western suburbs.",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
  },
  {
    title: "3BHK Apartment in Goregaon East",
    city: "Mumbai", type: "Apartment", price: 45000,
    description: "Premium 3BHK in Goregaon East near Film City and Oberoi Mall. Fully furnished, large balcony, high-speed internet. Gated complex with clubhouse, pool, and multiple sports facilities.",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
  },
  {
    title: "PG for Girls in Santacruz West",
    city: "Mumbai", type: "PG/Hostel", price: 12000,
    description: "Premium ladies PG in Santacruz West. AC rooms with attached bathrooms, all meals, WiFi, laundry service, and CCTV. Walking distance from Santacruz station. Very safe locality.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
  },

  // ── DELHI ──
  {
    title: "2BHK Flat in Rohini Sector 11",
    city: "Delhi", type: "Apartment", price: 17000,
    description: "Well-maintained 2BHK flat in Rohini Sector 11. Semi-furnished with wardrobes and modular kitchen. Close to Rohini West Metro Station, schools, and hospitals. Society has power backup and parking.",
    image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80",
  },
  {
    title: "4BHK Bungalow in Sainik Farms",
    city: "Delhi", type: "House", price: 120000,
    description: "Magnificent 4BHK bungalow in Sainik Farms, South Delhi's most exclusive neighbourhood. Private pool, garden, servant quarters, and 4-car parking. Fully furnished with premium interiors and smart home features.",
    image: "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800&q=80",
  },
  {
    title: "Warehouse Space in Okhla Industrial Area",
    city: "Delhi", type: "Commercial", price: 85000,
    description: "Large warehouse/godown in Okhla Phase 2. 5,000 sq.ft ground floor with 18-ft ceiling height, loading dock, and truck access. Power connection 3-phase, security, and CCTV. Suitable for logistics and manufacturing.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
  },

  // ── BANGALORE ──
  {
    title: "2BHK Flat in JP Nagar 7th Phase",
    city: "Bangalore", type: "Apartment", price: 24000,
    description: "Modern 2BHK in JP Nagar 7th Phase near Nice Road. Semi-furnished with AC in master bedroom, modular kitchen, and parking. Society has swimming pool, gym, and garden. Close to Bannerghatta Road IT corridor.",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
  },
  {
    title: "3BHK House in Banashankari",
    city: "Bangalore", type: "House", price: 35000,
    description: "Independent 3BHK house in Banashankari 3rd Stage. Ground + 1st floor, private terrace, garden, and 2-car parking. Semi-furnished. Close to metro, hospitals, and top schools. Peaceful residential locality.",
    image: "https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?w=800&q=80",
  },
  {
    title: "Single Room in Bommanahalli",
    city: "Bangalore", type: "Room", price: 7000,
    description: "Furnished single room in Bommanahalli near Silk Board and Outer Ring Road. Attached bathroom, WiFi, geyser, and power backup. Walking distance from bus stops. Ideal for IT professionals in HSR/BTM/Silk Board area.",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
  },

  // ── HYDERABAD ──
  {
    title: "2BHK Apartment in Miyapur",
    city: "Hyderabad", type: "Apartment", price: 18000,
    description: "Affordable 2BHK apartment in Miyapur near metro terminus. Semi-furnished with AC and modular kitchen. Society has gym, garden, and 24/7 security. Close to BHEL, Bachupally, and Nizampet IT zones.",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
  },
  {
    title: "Co-Working Office Space in Begumpet",
    city: "Hyderabad", type: "Commercial", price: 40000,
    description: "Fully managed co-working space in Begumpet, Central Hyderabad. 600 sq.ft private cabin, high-speed internet, conference room access, reception, and parking. Ideal for small teams and startups near Secunderabad.",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
  },

  // ── PUNE ──
  {
    title: "1BHK Apartment in Wakad",
    city: "Pune", type: "Apartment", price: 15000,
    description: "Compact 1BHK in Wakad near Hinjewadi IT Park. Semi-furnished with AC, geyser, and covered parking. Society has gym and garden. Excellent connectivity to Phase 1, 2, and 3 of Hinjewadi.",
    image: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800&q=80",
  },
  {
    title: "2BHK House in Aundh",
    city: "Pune", type: "House", price: 28000,
    description: "Charming 2BHK independent house in Aundh, North Pune. Ground floor with garden, parking, and terrace access. Semi-furnished with modular kitchen. Close to DP Road, ISKCON Temple, and Symbiosis colleges.",
    image: "https://images.unsplash.com/photo-1568605115459-4b731184f961?w=800&q=80",
  },

  // ── JAIPUR ──
  {
    title: "2BHK Apartment in Jagatpura",
    city: "Jaipur", type: "Apartment", price: 12000,
    description: "Affordable 2BHK flat in Jagatpura near Mahindra SEZ and Sitapura Industrial Area. Semi-furnished with basic amenities, parking, and power backup. Suitable for working professionals.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
  },
  {
    title: "Commercial Shop in Bapu Nagar",
    city: "Jaipur", type: "Commercial", price: 18000,
    description: "Ready-to-use commercial shop in Bapu Nagar, Central Jaipur. 300 sq.ft ground floor on main road. High footfall area, suitable for medical shop, grocery, or food outlet. Power connection and parking available.",
    image: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=800&q=80",
  },

  // ── CHENNAI ──
  {
    title: "3BHK Apartment in Porur",
    city: "Chennai", type: "Apartment", price: 28000,
    description: "Spacious 3BHK in Porur near DLF IT Park and Ramapuram. Semi-furnished with AC, modular kitchen, and parking. Society has club house, pool, and gym. Close to Mount Poonamallee Road and NH-48.",
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&q=80",
  },
  {
    title: "PG for Boys near IIT Madras",
    city: "Chennai", type: "PG/Hostel", price: 8500,
    description: "Student-friendly PG near IIT Madras and Taramani. Meals, WiFi, study room, AC, and laundry. Close to research park and Adyar. Single and sharing rooms available. Ideal for IIT students and researchers.",
    image: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80",
  },

  // ── GOA ──
  {
    title: "1BHK Apartment in Margao",
    city: "Goa", type: "Apartment", price: 12000,
    description: "Neat 1BHK flat in Margao, South Goa's commercial capital. Semi-furnished with fan, kitchen, and parking. Close to Margao railway station, market, and bus stand. Suitable for government employees and students.",
    image: "https://images.unsplash.com/photo-1537726235470-8504e3beef77?w=800&q=80",
  },
  {
    title: "4BHK Beachside Villa in Candolim",
    city: "Goa", type: "Villa", price: 150000,
    description: "Spectacular 4BHK beachside villa in Candolim, North Goa. Steps from the beach, private pool, landscaped garden, outdoor kitchen, and 4-car parking. Fully furnished with luxury amenities. Perfect for large families.",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80",
  },

  // ── KOLKATA ──
  {
    title: "2BHK Apartment in Behala",
    city: "Kolkata", type: "Apartment", price: 14000,
    description: "Well-maintained 2BHK in Behala, South Kolkata. Semi-furnished with AC and modular kitchen. Close to Diamond Harbour Road and Behala Chowrasta bus terminus. Good schools and markets nearby.",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
  },
  {
    title: "Office Space in Camac Street",
    city: "Kolkata", type: "Commercial", price: 55000,
    description: "Professional office space on Camac Street, Kolkata's prime business district. 1,000 sq.ft, 18 workstations, 2 cabins, and conference room. Central AC, power backup, lift. Close to Park Street and metro.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
  },

  // ── AHMEDABAD ──
  {
    title: "3BHK Apartment in Prahlad Nagar",
    city: "Ahmedabad", type: "Apartment", price: 28000,
    description: "Modern 3BHK in Prahlad Nagar, Ahmedabad's most premium residential and commercial zone. Fully furnished with AC, gym access, pool, and 2 parking slots. Close to ISCON temple, Alpha One Mall, and SG Highway.",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
  },
  {
    title: "PG for Boys near PDPU University",
    city: "Ahmedabad", type: "PG/Hostel", price: 7500,
    description: "Student PG near Pandit Deendayal Energy University (PDPU) in Gandhinagar-Ahmedabad corridor. Meals, WiFi, AC, study tables, and 24/7 security. Shuttle service to campus available.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
  },

];

async function addNewProperties() {
  try {
    const inserted = await Property.insertMany(newProperties);
    console.log(`\n✅ ${inserted.length} new properties added successfully!\n`);

    const total = await Property.countDocuments();
    console.log(`📊 Total properties in database: ${total}`);

    const cities = [...new Set(newProperties.map((p) => p.city))];
    console.log("\n── Naye Properties By City ──");
    cities.forEach((city) => {
      const count = newProperties.filter((p) => p.city === city).length;
      console.log(`  📍 ${city}: ${count} added`);
    });

    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
}

addNewProperties();
