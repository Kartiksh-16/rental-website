const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/rentalDB")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

const propertyRoutes = require("./routes/propertyRoutes");

app.use("/api/properties", propertyRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});