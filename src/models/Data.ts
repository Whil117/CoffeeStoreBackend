import mongoose from 'mongoose'

interface Props {
    Coffee:String
    With:string
    Grind:String
    Week:String
}

const Data = new mongoose.Schema<Props>({
    Coffee: {
        type: String
    },
    Type:{
        type:String
    },
    With: {
        type: String
    },
    Grind:{
        type:String
    },
    Week:{
        type:String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Data',Data) 