const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM employee', (err, rows, fields)=>{
        if(!err){
            res.json(rows);
        }else {
            console.log(err);
        }
    });
});

router.get('/:id',(req, res) =>{
    const {id} = req.params;
    console.log(id);
    mysqlConnection.query('SELECT * FROM employee WHERE id=?',[id],(err, rows, fields)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    });
});

//procedimiento almacenado.
router.post('/', (req, res)=>{
    const {id, name, salary} = req.body;
    const query = ' INSERT INTO employee VALUES(?, ?, ?);';
    mysqlConnection.query(query, [id, name, salary], (err, rows, fields)=>{
        if(!err){
            res.json({Status: "Employeed SAved"});
        }else{
            console.log(err);
        }
    });
});

router.put('/:id',(req, res)=>{
    const {name, salary} = req.body;
    const {id} = req.params;
    const query = ' CALL employeeAddOrEdit(?, ?, ?);';
    mysqlConnection.query(query, [id, name, salary], (err, rows, fields)=>{
        if(!err){
            res.json({status: "employee updated"});
        }else{
            console.log(err);
        }
    });
});

router.delete('/:id', (req, res)=>{
    const {id} = req.params;
    mysqlConnection.query('DELETE FROM employee WHERE id=?', [id],(err, rows, fields)=>{
        if(!err){
            res.json({status: "employee deleted!!"});
        }else{
            console.log("error!!!");
        }
    });
});

module.exports = router;