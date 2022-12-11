//////////////////////////////////////////////
//////// Fruits Model
///////////////////////////////////////////////
const mongoose = require('./connection')

const { Schema, model } = mongoose // destructuring, grabbing model and Schema off mongoose variable
// mongoose.Schema
// mongoose.model

const dlSchema = new Schema({
        dlName: String,
        done: Boolean,
        dateTurnedIn: String,
        dateDue: String,
        active: Boolean,
        weight:{
        galv: Number,
        ss: Number,
        blackIron: Number,
        pl: Number,
        alum: Number
    }
})

const jobsSchema = new  Schema({
    name: String,
    number: String,
    dl: [dlSchema]
})


const Job = model('Job', jobsSchema)
// const DL = model('DL', dlSchema)

module.exports = Job