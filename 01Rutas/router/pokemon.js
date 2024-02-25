'use strict'

const express=require('express');
const router=express.Router();
const Pokemon=require('../models/pokemon');


router.get('/', async (req,res)=>{

    try{
        const arrayPokemonDB=await Pokemon.find();
        console.log(arrayPokemonDB);
        res.render("pokemon", {
            arrayPokemon: arrayPokemonDB
        })
    }catch(error){
        console.error(error)
    }
})

router.post('/', async (req,res)=>{
    const body=req.body
    console.log(body)
    try{
        const PokemonDB=new Pokemon(body)
        await PokemonDB.save()
        res.redirect('/pokemon')
    }catch(error){
        console.log('error', error)
    }
})

router.get('/crear', (req,res)=>{
    res.render('crear')
})

router.get('/:id', async(req,res)=>{
    const id=req.params.id
    try{
        const pokemonDB= await Pokemon.findOne({_id:id})
        console.log(pokemonDB)
        res.render('detalle', {
            pokemon:pokemonDB,
            error:false
        })
    }catch(error){
        console.log('Se ha producido un error', error)
        res.render('detalle', {
            error:true,
            mensaje:'Pokemon no encontrado'
        })
    }
})

router.delete('/:id', async(req,res)=>{
    const id=req.params.id;
    console.log('_id desde backend', id)
    try{
        const pokemonDB=await Pokemon.findByIdAndDelete({_id:id});
        console.log(pokemonDB)
        if(!pokemonDB){
            res.json({
                estado:true,
                mensaje:'No se pudo eliminar'
            })
        }else{
            res.json({
                estado:true,
                mensaje:'Pokemon eliminado'
            })
        }
    }catch(error){
        console.log(error)
    }
})

router.put('/:id', async(req,res)=>{
    const id =req.params.id;
    const body=req.body;
    console.log('body', body)
    try{
        const pokemonDB=await Pokemon.findByIdAndUpdate(
            id,body, {useFindAndModifiy:false}
        )
        console.log(pokemonDB)
        res.json({
            estado:true,
            mensaje:'Pokémon editado'
        })
    }catch(error){
        console.log(error)
        res.json({
            estado:false,
            mensaje:'Problema al editar pokemon'
        })
    }
})

module.exports=router;


