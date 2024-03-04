'use strict'

const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const StarWarsSchema=new Schema({
    name:String,
    surname:String,
    affiliation:String,
    img:String
})

const StarWars=mongoose.model('StarWars', StarWarsSchema, "StarWars");

module.exports=StarWars;