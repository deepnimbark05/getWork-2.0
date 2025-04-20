const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcrypt')
const workerRoutes = require('./routes/workers')
const carousel = require("./routes/Carousel")
const homeImageRoutes = require('./routes/homeImages')
const userRoutes = require('./routes/users')
const app = express()
const path = require('path')

app.use(cors())
app.use(express.json())

// Serve static files from the public directory
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')))
app.use('/uploads/worker', express.static(path.join(__dirname, 'public/uploads/worker')))

mongoose.connect("mongodb://0.0.0.0/getWork");

// API routes
app.use('/api/workers', workerRoutes);
app.use('/api/carousel', carousel);
app.use('/api/home-images', homeImageRoutes);
app.use('/api/users', userRoutes);

app.listen(3001, () => {
    console.log("server is running");
})