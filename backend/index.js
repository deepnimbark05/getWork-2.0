const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/User')
const bcrypt = require('bcrypt')
const workerRoutes = require('./routes/workers')
const carousel = require("./routes/Carousel")
const homeImageRoutes = require('./routes/homeImages')
const app = express()
const path = require('path')

app.use(cors())
app.use(express.json())

// Serve static files from the public directory
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')))
app.use('/uploads/worker', express.static(path.join(__dirname, 'public/uploads/worker')))

mongoose.connect("mongodb://0.0.0.0/getWork");

// Worker routes
app.use('/api/workers', workerRoutes);
app.use('/api/carousel',carousel );
app.use('/api/home-images', homeImageRoutes);

// Login route
app.post("/login", (req, res) => {
    const { name, password } = req.body;
    UserModel.findOne({ name: name })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, response) => {
                    if (response) {
                        res.json({ status: "success", name: user.name });
                    } else {
                        res.json({ status: "password incorrect" });
                    } 
                })
            } else {
                res.json({ status: "no user found" });
            }
        })
})

// Register route
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 10)
        .then(hash => {
            UserModel.create({ name, email, password: hash })
                .then(user => res.json({ status: "success", name: user.name }))
                .catch(err => res.json({ status: "error", message: err.message }))
        }).catch(err => res.json({ status: "error", message: err.message }))
})

app.listen(3001, () => {
    console.log("server is running");
})