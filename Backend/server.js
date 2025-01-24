const express = require("express");
const mongoose = require("mongoose");
const charSchema = require("./models/character");
const CORS = require('cors');
const app = express();
const path = require('path');
require('dotenv').config();
const mongoUrl = process.env.MONGO_DB_URL;

// Middleware for handling JSON requests
app.use(express.json());

// Enable CORS
app.use(CORS({
  origin: '*', // Allow all origins for development
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
}));

// Serve static files from the "dist" folder in FrontEnd
// app.use(express.static(path.join(__dirname, 'FrontEnd', 'dist'))); // Correct the path to FrontEnd/dist

// Catch-all route for frontend, serving the React app's index.html


// MongoDB connection
async function connectDB() {
  try {
    await mongoose.connect(
      mongoUrl
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

connectDB();

// API route for fetching characters
app.get("/getchars", async (req, res) => {
  try {
    const chars = await charSchema.find();
    res.status(200).json(chars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// app.use(express.static('./frontend/dist'));
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
// });

// Start the server

