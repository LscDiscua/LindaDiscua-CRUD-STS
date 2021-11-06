import express from 'express';

import {agregarCarrera, agregarAlumno} from "../controllers/authController.js"

const router = express.Router()

import con from '../database/conection.js';

router.get('/',(req, res) => {
    res.render('index')
})

// Router Agregar Carreras
router.get('/carrera',(req, res) => {
    res.render('carrera')
})


// Router Agregar Alumnos
router.get('/alumno', function(req, res, next) {
    con.query('SELECT * FROM carrera ORDER BY idCarrera desc',function(err,rows){
    if(err){
       
        res.render('listaCarreras',{page_title:"Carreras - Node.js",data:''});   
    }else{
        res.render('alumno',{page_title:"Carreras - Node.js",data:rows});
        console.log({data: rows})
    }
    });
});


// Router Para Visualizar la lista de carreras
router.get('/listaCarreras', function(req, res, next) {
    con.query('SELECT * FROM carrera ORDER BY idCarrera desc',function(err,rows)     {
    if(err){
        req.flash('error', err); 
        res.render('listaCarreras',{page_title:"Carreras - Node.js",data:''});   
    }else{
        res.render('listaCarreras',{page_title:"Carreras - Node.js",data:rows});
        console.log({data: rows})
    }
    });
});



// Router Para Visualizar la carrera que se desea editar
router.get('/editarCarrera/(:id)', function(req, res, next){
    con.query('SELECT * FROM carrera WHERE idCarrera = ' + req.params.id, function(err, rows, fields) {
        if(err) throw err
        
        if (rows.length <= 0) {
            req.flash('error', 'Customers not found with id = ' + req.params.id)
            res.redirect('/customers')
        }
        else { 
        
            res.render('editarCarrera', {
            title: 'Edit Customer', 
            //data: rows[0],
            idCarrera: rows[0].idCarrera,
            nombreCarrera: rows[0].nombreCarrera,
            descripcionCarrera: rows[0].descripcionCarrera        
            
            
        })
        
        }            
    })
})


// Router para editar una carrera
router.post('/editarCa/:id', function(req, res, next) {

    const {nombreCarrera, descripcionCarrera } = req.body
  
        var carrera = {
            nombreCarrera: nombreCarrera,
            descripcionCarrera: descripcionCarrera
        }
    con.query('UPDATE carrera SET ? WHERE idCarrera = ' + req.params.id, carrera, function(err, result) {
    //if(err) throw err
    if (err) {
        res.render('carrera/edit', {
        title: 'Editar carreras',
        idCarrera: req.params.idCarrera,
        nombreCarrera: req.body.nombreCarrera,
        descripcionCarrera: req.body.descripcionCarrera
    })
    } else {
        res.redirect('/listaCarreras');
        console.log("hola")
    }
    })
})

// Router para eliminar una carrera
router.get('/eliminarCarrera/(:id)', function(req, res, next) {
    var carrera = { id: req.params.id }
    con.query('DELETE FROM carrera WHERE idCarrera = ' + req.params.id, carrera, function(err, result) {
    //if(err) throw err
    if (err) {
        res.redirect('/listaCarreras')
    } else {
        res.redirect('/listaCarreras')
    }
    })
})



// Router para ver el listado de alumnos
router.get('/listaAlumnos', function(req, res, next) {

    con.query('SELECT * FROM carrera',function(requiere, resultado){
        con.query('SELECT * FROM alumno ORDER BY identidad desc',function(err,rows)     {
        if(err){
            req.flash('error', err); 
            res.render('listaAlumnos',{page_title:"Customers - Node.js",data:''});   
        }else{
            res.render('listaAlumnos',{page_title:"Customers - Node.js",data:rows,carreras:resultado});
            // res.render('listaCarreras',{data: req.rows});
            console.log({carreras:resultado})
        }
        });
    })
});

// Router para ver los datos del alumno y asi editarlos
router.get('/editarAlumno/(:id)', function(req, res, next){

    con.query('SELECT * FROM carrera',function(requiere, resultado){

    con.query('SELECT * FROM alumno WHERE identidad = ' + req.params.id, function(err, rows, fields) {
        if(err) throw err
        if (rows.length <= 0) {
            res.redirect('/alumno')
        }
        else { 

            
            res.render('editarAlumno', {
            title: 'Edit Alumno', 
           
            identidad: rows[0].identidad,
            nombreAlumno: rows[0].nombreAlumno,
            apellidoAlumno: rows[0].apellidoAlumno,
            direccionAlumno: rows[0].direccionAlumno,
            fechaNacimiento: rows[0].fechaNacimiento,
            data: resultado 
            
        })

        }            
    })

})
 
})



// Router para ver los editar los datos del alumno
router.post('/editarAlum/:id', function(req, res, next) {

    const { identidad, 
        nombreAlumno,
        apellidoAlumno,
        direccionAlumno,
        fechaNacimiento,
        carrera
    } = req.body
      
        var alumno = {
            identidad:identidad,
            nombreAlumno: nombreAlumno,
            apellidoAlumno: apellidoAlumno,
            direccionAlumno: direccionAlumno,
            fechaNacimiento: fechaNacimiento,
            carrera: carrera
        }

    con.query('UPDATE alumno SET ? WHERE identidad = ' + req.params.id, alumno, function(err, result) {

    if (err) {
       
        res.render('editarAlumno/edit', {
        title: 'Editar Alumno',
        identidad: req.params.identidad,
        nombreAlumno: req.body.nombreAlumno,
        apellidoAlumno: req.body.apellidoAlumno,
        direccionAlumno: req.body. direccionAlumno,
        fechaNacimiento: req.body.fechaNacimiento,
        carrera: req.body.carrera
    })
    } else {
        res.redirect('/listaAlumnos');
        console.log("hola")
    }
    })
})


// Router Para eliminar un alumno
router.get('/eliminarAlumno/(:id)', function(req, res, next) {
    var alumno = { id: req.params.id }
    con.query('DELETE FROM alumno WHERE identidad = ' + req.params.id, alumno, function(err, result) {
    if (err) {
        res.redirect('/alumno')
    } else {
        res.redirect('/listaAlumnos')
    }
    })
})

router.post('/carrera', agregarCarrera)


router.post('/alumno', agregarAlumno)



export default router;