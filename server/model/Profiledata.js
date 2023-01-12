const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://riswanakbar:Riswanakbar@cluster0.cbdzfyg.mongodb.net/LOGINANDREGISTRATION?retryWrites=true&w=majority')
const Schema = mongoose.Schema

const ProfileSchema = new Schema({
    name: String,
    email: String,
    phone_number: String,
    address: String,
    password: String


})
var Profiledata = mongoose.model('Profiledata', ProfileSchema)
module.exports = Profiledata;

