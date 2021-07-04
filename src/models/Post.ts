const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    Coffee:{
        type:String,
    },
    Type:{
        type:String
    },
    With:{
        type:String || Number
    },
    Grind:{
        type:String
    },
    Week:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Posts',PostSchema)