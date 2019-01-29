const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/books', (req, res) => {
    mysqlConnection.query('SELECT * FROM books', (err, rows, fields)=>{
        if(!err){
            res.json(rows);
        }else {
            console.log(err);
        }
    });
});

router.get('/books/:id',(req, res) =>{
    const {id} = req.params;
    console.log(id);
    mysqlConnection.query('SELECT * FROM books WHERE id=?',[id],(err, rows, fields)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    });
});

//procedimiento almacenado.
router.post('/books', (req, res)=>{
    const {id, title, rating} = req.body;
    const query = ' INSERT INTO books VALUES(?, ?, ?);';
    mysqlConnection.query(query, [id, title, rating], (err, rows, fields)=>{
        
        if(!err){
            res.json({id: rows.insertId, title, rating});
        }else{
            console.log(err);
        }
    });
});

router.put('/books/:id',(req, res)=>{
    const {title,rating} = req.body;
    const {id} = req.params;
    const query = ' update books set title=?, rating=? where id=?;';
    mysqlConnection.query(query, [title,rating,id], (err, rows, fields)=>{
        if(!err){
            res.json({status: "employee updated"});
        }else{
            console.log(err);
        }
    });
});

router.delete('/books/:id', (req, res)=>{
    const {id} = req.params;
    mysqlConnection.query('DELETE FROM books WHERE id=?', [id],(err, rows, fields)=>{
        if(!err){
            res.json({status: "book deleted!!"});
        }else{
            console.log("error!!!");
        }
    });
});

/************************************************************* */



module.exports = router;