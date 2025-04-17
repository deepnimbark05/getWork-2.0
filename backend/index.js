const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/User')
const bcrypt = require('bcrypt')
const workerRoutes = require('./routes/workers')

const app = express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET","POST"],
    credentials: true,
}))

mongoose.connect("mongodb://0.0.0.0/getWork");

// Worker routes
app.use('/api/workers', workerRoutes);

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