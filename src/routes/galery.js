const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/items', (req, res) => {
    mysqlConnection.query('SELECT * FROM items', (err, rows, fields)=>{
        if(!err){
            res.json(rows);
        }else {
            console.log(err);
        }
    });
});

/*
router.get('/items', (req, res) => {
    const {id, name, image, category, label, price, featured, description} = req.body;
    const query = ' INSERT INTO items VALUES(?, ?, ?, ?, ?, ?, ?, ?);';
    mysqlConnection.query(query, [id, name, image, category, label, price, featured, description], (err, rows, fields)=>{
        
        if(!err){
            res.json({id: rows.insertId, title, rating});
        }else{
            console.log(err);
        }
    });
});
*/
router.get('/items/:id',(req, res) =>{
    const {id} = req.params;
    console.log(id);
    mysqlConnection.query('SELECT * FROM items WHERE id=?',[id],(err, rows, fields)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    });
});


module.exports = router;