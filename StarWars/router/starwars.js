'use strict'

const express=require('express');
const router=express.Router();
const StarWars=require('../models/starwars');


router.get('/', async (req,res)=>{

    try{
        const arrayStarWarsDB=await StarWars.find();
        console.log(arrayStarWarsDB);
        res.render("starwars", {
            arrayStarWars: arrayStarWarsDB
        })
    }catch(error){
        console.error(error)
    }
})

router.post('/', async (req,res)=>{
    const body=req.body
    console.log(body)
    try{
        const StarWarsDB=new StarWars(body)
        await StarWarsDB.save()
        res.redirect('/starwars')
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
        const StarWarsDB= await StarWars.findOne({_id:id})
        console.log(StarWarsDB)
        res.render('detalle', {
            starwars:StarWarsDB,
            error:false
        })
    }catch(error){
        console.log('Se ha producido un error', error)
        res.render('detalle', {
            error:true,
            mensaje:'Personaje no encontrado'
        })
    }
})

router.delete('/:id', async(req,res)=>{
    const id=req.params.id;
    console.log('_id desde backend', id)
    try{
        const StarWarsDB=await StarWars.findByIdAndDelete({_id:id});
        console.log(StarWarsDB)
        if(!StarWarsDB){
            res.json({
                estado:true,
                mensaje:'No se pudo eliminar'
            })
        }else{
            res.json({
                estado:true,
                mensaje:'Personaje eliminado'
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
        const StarWarsDB=await StarWars.findByIdAndUpdate(
            id,body, {useFindAndModifiy:false}
        )
        console.log(StarWarsDB)
        res.json({
            estado:true,
            mensaje:'Personaje editado'
        })
    }catch(error){
        console.log(error)
        res.json({
            estado:false,
            mensaje:'Problema al editar personaje'
        })
    }
})

module.exports=router;


