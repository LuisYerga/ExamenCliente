'use strict'

const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const StarWarsSchema=new Schema({
    id:Number,
    name:String,
    surname:String,
    affiliation:String
})

const StarWars=mongoose.model('StarWars', StarWarsSchema, "starwars");

module.exports=StarWars;