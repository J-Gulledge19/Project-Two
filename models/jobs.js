//////////////////////////////////////////////
//////// Fruits Model
///////////////////////////////////////////////
const mongoose = require('./connection')

const { Schema, model } = mongoose // destructuring, grabbing model and Schema off mongoose variable
// mongoose.Schema
// mongoose.model


const jobsSchema = new  Schema({
    name: String,
    number: String,
    done: Boolean,
    dateTurnedIn: String,
    dateDue: String,
    weight: {
        galv: Number,
        ss: Number,
        blackIron: Number,
        pl: Number,
        alum: Number
    }
})

const Job = model('Job', jobsSchema)

module.exports = Job
