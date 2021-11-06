import con from '../database/conection.js';

export const agregarCarrera = async(req, res) => {
    const {nombreCarrera, descripcionCarrera } = req.body


    const data = {
        nombreCarrera: nombreCarrera,
        descripcionCarrera: descripcionCarrera
    }

    // Construir query para realizar la insersion

    con.query('INSERT INTO carrera SET ?', data, (err, result) => {

        if(err){
            console.log("Ocurrio un error al insertar la carrera")
            return
        }

        res.redirect('/')

    } )
}

export const agregarAlumno = async(req, res) => {
    const { identidad, 
            nombreAlumno,
            apellidoAlumno,
            direccionAlumno,
            fechaNacimiento,
            carrera
        } = req.body


    const data = {
        identidad:identidad,
        nombreAlumno: nombreAlumno,
        apellidoAlumno: apellidoAlumno,
        direccionAlumno: direccionAlumno,
        fechaNacimiento: fechaNacimiento,
        carrera: carrera
    }

    // Construir query para realizar la insersion

    con.query('INSERT INTO alumno SET ?', data, (err, result) => {

        if(err){
            console.log("Ocurrio un error al insertar el alumno")
            return
        }

        
        

        res.redirect('/')

    } )
}