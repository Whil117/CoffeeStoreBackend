// const mongoose = require('mongoose')
import mongoose from 'mongoose'

const RegisterUser = new mongoose.Schema({
    username: {
        type: String,
    },
    password: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Register',RegisterUser)