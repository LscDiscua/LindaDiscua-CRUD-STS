import express from 'express';
import './loadEnv.js'
import router from './routes/routes.js'

const PORT = 11000
const app = express()


// app.set('view engine', 'pug')

app.set('view engine', 'ejs')


app.use(express.static('public'))


app.use(express.urlencoded({extended: true}))

app.use(express.json())


app.use('/', router)

// app.use('/listaCarreras', router)

// // Prueba de coneccion
import cnn from "./database/conection.js"

// accedder  alsa variables de entorno 
// console.log(process.env.DB_USERNAME)
// console.log(process.env.DB_DATABASE)

// Servidor de express escuchando
app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`)
})