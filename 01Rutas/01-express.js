'use strict'

let express = require('express'),
mongoose=require('mongoose'),
bodyParser=require('body-parser'),
app=express();
//PARSE
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//.env
require('dotenv').config();
let port=process.env.PORT || 4000;
//Static files 
app.use(express.static(__dirname+'/public/'));
//Views
app.set('view engine' , 'ejs');
app.set('views', __dirname+'/views/');
//Routes
app
.use('/', require('./router/rutas'))
.use('/pokemon',require('./router/pokemon'))

.use((req,res)=>{
    res.status(404).render('404',{
        titulo:"Error 404",
        descripcion:"Page Not Found"
    })
})


.listen(port)

const user=process.env.USER;
const password=process.env.PASSWORD;
const dbname=process.env.DBNAME;
const uri=`mongodb+srv://${user}:${password}@cluster0.2pq3yff.mongodb.net/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(uri,
    {
       
    })
    .then(()=>console.log('Base de datos'))
    .catch(e=>console.log(e))

console.log('Iniciando Express en el puerto 3000')