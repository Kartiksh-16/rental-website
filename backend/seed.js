// =====================================================
// seed.js — With Owner Details + Location Coordinates
// Command: node seed.js
// =====================================================

const mongoose = require("mongoose");
const Property = require("./models/Property");

mongoose
  .connect("mongodb://127.0.0.1:27017/rentalDB")
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// City coordinates
const CITY_COORDS = {
  Mumbai:    { lat: 19.0760, lng: 72.8777 },
  Delhi:     { lat: 28.6139, lng: 77.2090 },
  Bangalore: { lat: 12.9716, lng: 77.5946 },
  Goa:       { lat: 15.2993, lng: 74.1240 },
  Hyderabad: { lat: 17.3850, lng: 78.4867 },
  Pune:      { lat: 18.5204, lng: 73.8567 },
  Jaipur:    { lat: 26.9124, lng: 75.7873 },
  Chennai:   { lat: 13.0827, lng: 80.2707 },
  Kolkata:   { lat: 22.5726, lng: 88.3639 },
  Ahmedabad: { lat: 23.0225, lng: 72.5714 },
};

// Owner pool
const OWNERS = [
  { ownerName: "Rajesh Sharma",   ownerPhone: "+91 98765 43210", ownerEmail: "rajesh.sharma@gmail.com",   ownerType: "Owner",   ownerSince: "2019" },
  { ownerName: "Priya Mehta",     ownerPhone: "+91 87654 32109", ownerEmail: "priya.mehta@gmail.com",     ownerType: "Owner",   ownerSince: "2020" },
  { ownerName: "Amit Verma",      ownerPhone: "+91 76543 21098", ownerEmail: "amit.verma@gmail.com",      ownerType: "Agent",   ownerSince: "2018" },
  { ownerName: "Sunita Patel",    ownerPhone: "+91 95432 10987", ownerEmail: "sunita.patel@gmail.com",    ownerType: "Owner",   ownerSince: "2021" },
  { ownerName: "Vikram Singh",    ownerPhone: "+91 94321 09876", ownerEmail: "vikram.singh@gmail.com",    ownerType: "Builder", ownerSince: "2017" },
  { ownerName: "Deepa Nair",      ownerPhone: "+91 93210 98765", ownerEmail: "deepa.nair@gmail.com",      ownerType: "Owner",   ownerSince: "2022" },
  { ownerName: "Arjun Reddy",     ownerPhone: "+91 92109 87654", ownerEmail: "arjun.reddy@gmail.com",     ownerType: "Agent",   ownerSince: "2019" },
  { ownerName: "Kavita Joshi",    ownerPhone: "+91 91098 76543", ownerEmail: "kavita.joshi@gmail.com",    ownerType: "Owner",   ownerSince: "2020" },
  { ownerName: "Suresh Kumar",    ownerPhone: "+91 90987 65432", ownerEmail: "suresh.kumar@gmail.com",    ownerType: "Owner",   ownerSince: "2021" },
  { ownerName: "Neha Gupta",      ownerPhone: "+91 89876 54321", ownerEmail: "neha.gupta@gmail.com",      ownerType: "Agent",   ownerSince: "2018" },
];

function getOwner(i) {
  return OWNERS[i % OWNERS.length];
}

function getCoords(city) {
  const base = CITY_COORDS[city] || { lat: 20.5937, lng: 78.9629 };
  return {
    latitude:  base.lat + (Math.random() - 0.5) * 0.05,
    longitude: base.lng + (Math.random() - 0.5) * 0.05,
  };
}

const rawProperties = [

  // ── MUMBAI ──────────────────────────────────────
  { title: "2BHK Apartment in Bandra West",         city: "Mumbai",    type: "Apartment",  price: 65000,  bedrooms: "2", bathrooms: "2", area: "1100 sq.ft", furnishing: "Fully Furnished",  floor: "4th / 8",  facing: "West",  availability: "Immediate",  locality: "Bandra West",     address: "Turner Road, Bandra West, Mumbai - 400050",          description: "Spacious 2BHK in the heart of Bandra West. Modern interiors, large balcony with sea breeze. Walking distance from Linking Road and Bandstand. 24/7 security, elevator, dedicated parking.", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80" },
  { title: "1BHK Flat in Andheri East",             city: "Mumbai",    type: "Apartment",  price: 22000,  bedrooms: "1", bathrooms: "1", area: "620 sq.ft",  furnishing: "Semi-Furnished",   floor: "2nd / 6",  facing: "East",  availability: "Immediate",  locality: "Andheri East",    address: "MIDC Road, Andheri East, Mumbai - 400093",           description: "Well-maintained 1BHK near Andheri Metro Station. Ideal for working professionals. Close to MIDC and major IT hubs. Semi-furnished with modular kitchen and geyser.", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80" },
  { title: "3BHK Sea-View Apartment in Worli",      city: "Mumbai",    type: "Apartment",  price: 150000, bedrooms: "3", bathrooms: "3", area: "2200 sq.ft", furnishing: "Fully Furnished",  floor: "18th / 25",facing: "West",  availability: "15 Jan 2025",locality: "Worli",           address: "Worli Sea Face, Worli, Mumbai - 400018",             description: "Luxurious 3BHK apartment in Worli with stunning sea view. Premium building with concierge service, infinity pool, private gym, and valet parking. Marble flooring, smart home.", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80" },
  { title: "Studio Apartment in Powai",             city: "Mumbai",    type: "Apartment",  price: 18000,  bedrooms: "1", bathrooms: "1", area: "480 sq.ft",  furnishing: "Fully Furnished",  floor: "5th / 10", facing: "North", availability: "Immediate",  locality: "Powai",           address: "Hiranandani Gardens, Powai, Mumbai - 400076",        description: "Compact and fully furnished studio near Hiranandani Gardens and Powai Lake. Includes WiFi, AC, and washing machine. Gated society with gym and swimming pool.", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80" },
  { title: "Single Room in Dadar West",             city: "Mumbai",    type: "Room",       price: 9500,   bedrooms: "1", bathrooms: "1", area: "250 sq.ft",  furnishing: "Furnished",        floor: "1st / 4",  facing: "South", availability: "Immediate",  locality: "Dadar West",      address: "Shivaji Park, Dadar West, Mumbai - 400028",          description: "Decent single occupancy room in Dadar West. Shared kitchen and bathroom, clean and well-maintained. Walking distance from Dadar Railway Station.", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80" },
  { title: "PG for Boys in Kurla",                  city: "Mumbai",    type: "PG/Hostel",  price: 8000,   bedrooms: "1", bathrooms: "1", area: "200 sq.ft",  furnishing: "Furnished",        floor: "2nd / 4",  facing: "East",  availability: "Immediate",  locality: "Kurla",           address: "LBS Marg, Kurla West, Mumbai - 400070",              description: "Affordable PG for boys in Kurla. Meals included (breakfast & dinner), WiFi, laundry, housekeeping. AC and non-AC options. Close to Kurla railway station.", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80" },
  { title: "3BHK Independent House in Thane West",  city: "Mumbai",    type: "House",      price: 38000,  bedrooms: "3", bathrooms: "3", area: "1600 sq.ft", furnishing: "Semi-Furnished",   floor: "G+1",      facing: "North", availability: "Immediate",  locality: "Thane West",      address: "Vasant Vihar, Thane West, Mumbai - 400601",          description: "Spacious 3BHK independent house in Thane West with private garden and parking. Close to Viviana Mall, Jupiter Hospital, and Thane railway station.", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80" },
  { title: "Office Space in BKC",                   city: "Mumbai",    type: "Commercial", price: 180000, bedrooms: "-", bathrooms: "2", area: "1200 sq.ft", furnishing: "Fully Furnished",  floor: "7th / 15", facing: "East",  availability: "Immediate",  locality: "BKC",             address: "Bandra Kurla Complex, Mumbai - 400051",              description: "Premium furnished office in BKC, Mumbai's top business district. 1,200 sq.ft, 20 workstations, 2 cabins, conference room. Central AC, power backup, basement parking.", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" },
  { title: "Luxury Villa in Juhu",                  city: "Mumbai",    type: "Villa",      price: 250000, bedrooms: "5", bathrooms: "5", area: "5000 sq.ft", furnishing: "Fully Furnished",  floor: "G+2",      facing: "West",  availability: "1 Feb 2025", locality: "Juhu",            address: "JVPD Scheme, Juhu, Mumbai - 400049",                 description: "Grand 5BHK sea-facing villa in Juhu. Private pool, home theatre, landscaped garden, and 4-car garage. Italian marble, smart home automation. Minutes from Juhu Beach.", image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80" },
  { title: "Showroom in Linking Road",              city: "Mumbai",    type: "Commercial", price: 120000, bedrooms: "-", bathrooms: "1", area: "800 sq.ft",  furnishing: "Unfurnished",      floor: "Ground",   facing: "West",  availability: "Immediate",  locality: "Bandra West",     address: "Linking Road, Bandra West, Mumbai - 400050",         description: "Prime showroom on Linking Road, Bandra — one of Mumbai's top shopping streets. Ground floor, 800 sq.ft with glass facade, high footfall. Suitable for fashion, food, or retail.", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" },

  // ── DELHI ───────────────────────────────────────
  { title: "3BHK House in Vasant Kunj",             city: "Delhi",     type: "House",      price: 55000,  bedrooms: "3", bathrooms: "3", area: "2000 sq.ft", furnishing: "Semi-Furnished",   floor: "G+1",      facing: "South", availability: "Immediate",  locality: "Vasant Kunj",     address: "Sector C, Vasant Kunj, New Delhi - 110070",          description: "Spacious 3BHK in Vasant Kunj, South Delhi. Large living room, modular kitchen, 3 bedrooms with attached bathrooms, servant quarters, and covered parking for 2 cars.", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80" },
  { title: "2BHK Flat in Dwarka Sector 7",          city: "Delhi",     type: "Apartment",  price: 20000,  bedrooms: "2", bathrooms: "2", area: "950 sq.ft",  furnishing: "Semi-Furnished",   floor: "3rd / 8",  facing: "East",  availability: "Immediate",  locality: "Dwarka",          address: "Sector 7, Dwarka, New Delhi - 110075",               description: "Affordable 2BHK flat 500m from Dwarka Metro Station. Semi-furnished with modular kitchen and wardrobes. Society has 24-hour security and power backup.", image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80" },
  { title: "4BHK Penthouse in South Extension",     city: "Delhi",     type: "Villa",      price: 120000, bedrooms: "4", bathrooms: "4", area: "3500 sq.ft", furnishing: "Fully Furnished",  floor: "Top / 5",  facing: "North", availability: "15 Jan 2025",locality: "South Extension", address: "South Extension Part II, New Delhi - 110049",        description: "Magnificent 4BHK penthouse with private terrace garden. Designer interiors, home theatre, jacuzzi. Walking distance from South Ex market and metro.", image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80" },
  { title: "PG for Girls in Lajpat Nagar",          city: "Delhi",     type: "PG/Hostel",  price: 11000,  bedrooms: "1", bathrooms: "1", area: "200 sq.ft",  furnishing: "Furnished",        floor: "2nd / 4",  facing: "East",  availability: "Immediate",  locality: "Lajpat Nagar",    address: "Central Market, Lajpat Nagar, New Delhi - 110024",   description: "Safe and comfortable PG for working women in Lajpat Nagar. Meals, WiFi, housekeeping, CCTV, biometric entry. Walking distance from Lajpat Nagar Metro.", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80" },
  { title: "Office Space in Connaught Place",       city: "Delhi",     type: "Commercial", price: 95000,  bedrooms: "-", bathrooms: "2", area: "900 sq.ft",  furnishing: "Fully Furnished",  floor: "4th / 10", facing: "South", availability: "Immediate",  locality: "Connaught Place", address: "Connaught Place, New Delhi - 110001",                 description: "Prestigious furnished office in CP, Delhi's business heart. 900 sq.ft, 15 workstations, 2 cabins, reception. Central AC, high-speed internet, metro walking distance.", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" },

  // ── BANGALORE ───────────────────────────────────
  { title: "2BHK Flat in Koramangala",              city: "Bangalore", type: "Apartment",  price: 32000,  bedrooms: "2", bathrooms: "2", area: "1050 sq.ft", furnishing: "Fully Furnished",  floor: "3rd / 6",  facing: "East",  availability: "Immediate",  locality: "Koramangala",     address: "5th Block, Koramangala, Bangalore - 560095",         description: "Modern 2BHK in Koramangala's startup hub. Fully furnished, high-speed WiFi, AC. Walking distance from Swiggy, Zomato offices and top restaurants.", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80" },
  { title: "3BHK Apartment in Whitefield",          city: "Bangalore", type: "Apartment",  price: 38000,  bedrooms: "3", bathrooms: "3", area: "1550 sq.ft", furnishing: "Semi-Furnished",   floor: "5th / 12", facing: "North", availability: "Immediate",  locality: "Whitefield",      address: "ITPL Main Road, Whitefield, Bangalore - 560066",     description: "Premium 3BHK in Whitefield ITPL corridor. Gated community with club house, two swimming pools, badminton court, and 24/7 security.", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80" },
  { title: "Independent Villa in HSR Layout",       city: "Bangalore", type: "Villa",      price: 75000,  bedrooms: "4", bathrooms: "4", area: "3200 sq.ft", furnishing: "Fully Furnished",  floor: "G+2",      facing: "East",  availability: "Immediate",  locality: "HSR Layout",      address: "Sector 2, HSR Layout, Bangalore - 560102",           description: "Luxurious 4BHK villa with private garden, terrace, and 3-car garage. Premium imported fittings, smart home features, home theatre. 10 mins from Electronic City.", image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80" },
  { title: "PG for Boys in BTM Layout",             city: "Bangalore", type: "PG/Hostel",  price: 7500,   bedrooms: "1", bathrooms: "1", area: "180 sq.ft",  furnishing: "Furnished",        floor: "2nd / 3",  facing: "East",  availability: "Immediate",  locality: "BTM Layout",      address: "BTM 2nd Stage, Bangalore - 560076",                  description: "Budget PG for boys in BTM Layout 2nd Stage. Meals, WiFi, RO water, 24/7 security. Close to Silk Board Junction and major tech companies.", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80" },
  { title: "IT Office in Electronic City",          city: "Bangalore", type: "Commercial", price: 85000,  bedrooms: "-", bathrooms: "2", area: "1500 sq.ft", furnishing: "Fully Furnished",  floor: "6th / 10", facing: "South", availability: "Immediate",  locality: "Electronic City", address: "Phase 1, Electronic City, Bangalore - 560100",       description: "Ready-to-move IT office in Electronic City Phase 1. 1,500 sq.ft, 30 workstations, 3 cabins, server room, pantry. Surrounded by Infosys, Wipro, TCS.", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" },

  // ── GOA ─────────────────────────────────────────
  { title: "2BHK Beach House in Calangute",         city: "Goa",       type: "House",      price: 45000,  bedrooms: "2", bathrooms: "2", area: "1200 sq.ft", furnishing: "Fully Furnished",  floor: "G+1",      facing: "West",  availability: "Immediate",  locality: "Calangute",       address: "Calangute Beach Road, North Goa - 403516",           description: "Beautiful 2BHK beach house just 200m from Calangute Beach. Fully furnished, private garden, BBQ area, and hammock. High-speed WiFi, AC rooms, and parking.", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80" },
  { title: "Luxury Villa with Pool in Assagao",     city: "Goa",       type: "Villa",      price: 130000, bedrooms: "3", bathrooms: "3", area: "3000 sq.ft", furnishing: "Fully Furnished",  floor: "G+1",      facing: "South", availability: "Immediate",  locality: "Assagao",         address: "Assagao Village, North Goa - 403507",                description: "Stunning luxury villa in Assagao with private pool, landscaped garden, outdoor dining. Close to Gunpowder restaurant and artisan cafes. Perfect for families.", image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80" },
  { title: "Studio Apartment in Panaji",            city: "Goa",       type: "Apartment",  price: 15000,  bedrooms: "1", bathrooms: "1", area: "420 sq.ft",  furnishing: "Semi-Furnished",   floor: "2nd / 4",  facing: "East",  availability: "Immediate",  locality: "Panaji",          address: "MG Road, Panaji, Goa - 403001",                      description: "Comfortable studio in Panaji, Goa's capital. Furnished with AC and WiFi. Walking distance from Panjim market and Mandovi River promenade.", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80" },

  // ── HYDERABAD ────────────────────────────────────
  { title: "2BHK Flat in HITEC City",               city: "Hyderabad", type: "Apartment",  price: 28000,  bedrooms: "2", bathrooms: "2", area: "1100 sq.ft", furnishing: "Semi-Furnished",   floor: "4th / 8",  facing: "East",  availability: "Immediate",  locality: "HITEC City",      address: "Cyber Towers Road, HITEC City, Hyderabad - 500081",  description: "Modern 2BHK in HITEC City, Hyderabad's IT hub. Walking distance from Cyber Towers and DLF Cyber City. Gated community with gym, pool, 24/7 security.", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80" },
  { title: "4BHK Villa in Jubilee Hills",           city: "Hyderabad", type: "Villa",      price: 90000,  bedrooms: "4", bathrooms: "4", area: "3500 sq.ft", furnishing: "Fully Furnished",  floor: "G+2",      facing: "North", availability: "Immediate",  locality: "Jubilee Hills",   address: "Road No. 36, Jubilee Hills, Hyderabad - 500033",     description: "Elegant 4BHK villa in Jubilee Hills, Hyderabad's most prestigious address. Private pool, landscaped garden, designer interiors, and 3-car parking.", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" },
  { title: "3BHK in Gachibowli",                   city: "Hyderabad", type: "Apartment",  price: 42000,  bedrooms: "3", bathrooms: "3", area: "1600 sq.ft", furnishing: "Fully Furnished",  floor: "7th / 14", facing: "South", availability: "Immediate",  locality: "Gachibowli",      address: "DLF Cyber City Road, Gachibowli, Hyderabad - 500032",description: "Spacious 3BHK near Microsoft, Google, and Amazon campuses. Club amenities include badminton, table tennis, gym, rooftop garden. Power backup, 24/7 security.", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80" },

  // ── PUNE ────────────────────────────────────────
  { title: "2BHK Flat in Hinjewadi",                city: "Pune",      type: "Apartment",  price: 22000,  bedrooms: "2", bathrooms: "2", area: "980 sq.ft",  furnishing: "Semi-Furnished",   floor: "3rd / 7",  facing: "East",  availability: "Immediate",  locality: "Hinjewadi",       address: "Phase 1, Hinjewadi, Pune - 411057",                  description: "Well-maintained 2BHK in Hinjewadi Phase 1, Pune's IT corridor. Close to Infosys, Wipro, TCS. Society has swimming pool, gym, and kids play area.", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80" },
  { title: "3BHK Apartment in Koregaon Park",       city: "Pune",      type: "Apartment",  price: 45000,  bedrooms: "3", bathrooms: "3", area: "1800 sq.ft", furnishing: "Fully Furnished",  floor: "2nd / 5",  facing: "West",  availability: "Immediate",  locality: "Koregaon Park",   address: "Lane 5, Koregaon Park, Pune - 411001",               description: "Premium 3BHK fully furnished in Koregaon Park, Pune's most upmarket address. Luxury interiors, large private terrace. Walking distance from Osho Ashram.", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80" },
  { title: "Luxury Villa in Kalyani Nagar",         city: "Pune",      type: "Villa",      price: 80000,  bedrooms: "4", bathrooms: "4", area: "3800 sq.ft", furnishing: "Fully Furnished",  floor: "G+2",      facing: "North", availability: "Immediate",  locality: "Kalyani Nagar",   address: "Kalyani Nagar, Pune - 411006",                       description: "Stunning 4BHK villa with private pool, home gym, home theatre, and landscaped garden. Fully furnished with Italian marble and imported fittings.", image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80" },

  // ── JAIPUR ───────────────────────────────────────
  { title: "3BHK House in C-Scheme",                city: "Jaipur",    type: "House",      price: 25000,  bedrooms: "3", bathrooms: "3", area: "1800 sq.ft", furnishing: "Semi-Furnished",   floor: "G+1",      facing: "East",  availability: "Immediate",  locality: "C-Scheme",        address: "Sardar Patel Marg, C-Scheme, Jaipur - 302001",       description: "Charming 3BHK in C-Scheme, Jaipur's premium area. Traditional Rajasthani architecture, modern interiors, courtyard, terrace. Close to MI Road and top schools.", image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80" },
  { title: "Haveli-Style Villa in Civil Lines",     city: "Jaipur",    type: "Villa",      price: 65000,  bedrooms: "5", bathrooms: "5", area: "4500 sq.ft", furnishing: "Fully Furnished",  floor: "G+2",      facing: "South", availability: "Immediate",  locality: "Civil Lines",     address: "Civil Lines, Jaipur - 302006",                       description: "Royal heritage haveli-style villa. Arched doorways, hand-painted frescos, private courtyard with fountain, rooftop with Pink City views. Fully restored with modern amenities.", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80" },
  { title: "2BHK Flat in Malviya Nagar",            city: "Jaipur",    type: "Apartment",  price: 14000,  bedrooms: "2", bathrooms: "2", area: "900 sq.ft",  furnishing: "Semi-Furnished",   floor: "1st / 4",  facing: "East",  availability: "Immediate",  locality: "Malviya Nagar",   address: "Malviya Nagar, Jaipur - 302017",                     description: "Affordable 2BHK flat in Malviya Nagar. Semi-furnished, parking, 24/7 water supply. Close to JLN Marg and Durgapura Railway Station. Ideal for families.", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" },

  // ── CHENNAI ──────────────────────────────────────
  { title: "2BHK Apartment in Anna Nagar",          city: "Chennai",   type: "Apartment",  price: 24000,  bedrooms: "2", bathrooms: "2", area: "1050 sq.ft", furnishing: "Semi-Furnished",   floor: "3rd / 6",  facing: "East",  availability: "Immediate",  locality: "Anna Nagar",      address: "Anna Nagar West, Chennai - 600040",                  description: "Bright and spacious 2BHK in Anna Nagar West. Semi-furnished with tiles flooring and modular kitchen. Close to Anna Nagar Tower Park and metro.", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80" },
  { title: "3BHK Villa on ECR Road",                city: "Chennai",   type: "Villa",      price: 60000,  bedrooms: "3", bathrooms: "3", area: "2800 sq.ft", furnishing: "Fully Furnished",  floor: "G+1",      facing: "East",  availability: "Immediate",  locality: "ECR Road",        address: "East Coast Road, Palavakkam, Chennai - 600041",      description: "Gorgeous 3BHK beach villa on ECR with direct sea access. Private pool, garden, and ocean-view terrace. 30 minutes from Chennai city centre.", image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80" },

  // ── KOLKATA ──────────────────────────────────────
  { title: "3BHK Apartment in Salt Lake",           city: "Kolkata",   type: "Apartment",  price: 28000,  bedrooms: "3", bathrooms: "3", area: "1400 sq.ft", furnishing: "Semi-Furnished",   floor: "4th / 8",  facing: "South", availability: "Immediate",  locality: "Salt Lake",       address: "Sector V, Salt Lake City, Kolkata - 700091",         description: "Spacious 3BHK in Salt Lake Sector V, Kolkata's IT hub. Close to TCS, Cognizant, and Infosys campuses. Society has generator backup and security.", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80" },
  { title: "3BHK Villa in New Town Rajarhat",       city: "Kolkata",   type: "Villa",      price: 55000,  bedrooms: "3", bathrooms: "3", area: "2600 sq.ft", furnishing: "Semi-Furnished",   floor: "G+2",      facing: "East",  availability: "Immediate",  locality: "New Town",        address: "New Town Rajarhat, Kolkata - 700156",                description: "Modern 3BHK villa in New Town Rajarhat. Private garden, 2-car parking, home office. Close to DLF IT Park, Eco Park, and City Centre 2 Mall.", image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80" },

  // ── AHMEDABAD ────────────────────────────────────
  { title: "3BHK Apartment in SG Highway",          city: "Ahmedabad", type: "Apartment",  price: 22000,  bedrooms: "3", bathrooms: "3", area: "1350 sq.ft", furnishing: "Semi-Furnished",   floor: "6th / 14", facing: "West",  availability: "Immediate",  locality: "SG Highway",      address: "Prahlad Nagar, SG Highway, Ahmedabad - 380015",      description: "Modern 3BHK on SG Highway, Ahmedabad's fastest growing corridor. Semi-furnished with AC, modular kitchen, and clubhouse access. Close to GIFT City.", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80" },
  { title: "Villa in Satellite Area",               city: "Ahmedabad", type: "Villa",      price: 60000,  bedrooms: "4", bathrooms: "4", area: "3200 sq.ft", furnishing: "Fully Furnished",  floor: "G+2",      facing: "North", availability: "Immediate",  locality: "Satellite",       address: "Satellite Road, Ahmedabad - 380015",                 description: "Elegant 4BHK villa in Satellite, Ahmedabad's premium zone. Private garden, terrace, 3-car parking. Modern interiors with Gujarati design touches.", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" },

];

// ── Assign owner + coordinates ───────────────────
const properties = rawProperties.map((p, i) => {
  const coords = getCoords(p.city);
  const owner  = getOwner(i);
  return {
    ...p,
    ...owner,
    latitude:  coords.latitude,
    longitude: coords.longitude,
  };
});

async function seedData() {
  try {
    await Property.deleteMany({});
    console.log("✅ Old data cleared.\n");

    const inserted = await Property.insertMany(properties);
    console.log(`🏠 Successfully added ${inserted.length} properties!\n`);

    const cities = [...new Set(properties.map((p) => p.city))];
    const types  = [...new Set(properties.map((p) => p.type))];

    console.log("── By City ──────────────────");
    cities.forEach((city) => {
      const count = properties.filter((p) => p.city === city).length;
      console.log(`  📍 ${city}: ${count}`);
    });

    console.log("\n── By Type ──────────────────");
    types.forEach((type) => {
      const count = properties.filter((p) => p.type === type).length;
      console.log(`  🏷️  ${type}: ${count}`);
    });

    console.log("\n🚀 Seed complete!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

seedData();
