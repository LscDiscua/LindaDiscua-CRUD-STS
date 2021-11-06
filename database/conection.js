import mysql from 'mysql2';

// variable que tiene la conexion
const cnn = mysql.createConnection({
    host:process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE

})


// El err tendra informacion si no se conecta a la base de datos

cnn.connect( err =>{
    if(err) {
        console.log(`${err}`)
        return 
    }


    console.log(`Connected to database ${process.env.DB_DATABASE}`)
})


export default cnn