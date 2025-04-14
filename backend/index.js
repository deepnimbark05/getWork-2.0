const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/User')
const bcrypt = require('bcrypt');



const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://0.0.0.0/getWork");

app.post("/login", (req, res) => {
    const { name, password } = req.body;
    UserModel.findOne({ name: name })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, response) => {
                    if (response) {
                        res.json("success")
                    }else{
                        res.json("password incorrect")
                    } 
                })
            } else {
                res.json("no user found")
            }
        })
})


app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 10)
        .then(hash => {
            UserModel.create({ name, email, password: hash })
                .then(users => res.json(users))
                .catch(err => res.json(err))
        }).catch(err => console.log(err.message))
})

app.listen(3001, () => {
    console.log("server is running");
})