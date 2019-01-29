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

//procedimiento almacenado.
router.post('/items', (req, res)=>{
    const { name, image, category, label, price, featured, description} = req.body;
    const query = ' INSERT INTO items (name, image, category, label, price, featured, description) VALUES( ?, ?, ?, ?, ?, ?, ?);';
    mysqlConnection.query(query, [ name, image, category, label, price, featured, description], (err, rows, fields)=>{
        
        if(!err){
            res.json({id: rows.insertId, name, image, category, label, price, featured, description});
        }else{
            console.log(err);
        }
    });
});

router.put('/items/:id',(req, res)=>{
    const { name, image, category, label, price, featured, description} = req.body;
    const {id} = req.params;
    const query = ' UPDATE items set name=?, image=?, category=?, label=?, price=?, featured=?, description=? WHERE id=?;';
    mysqlConnection.query(query, [ name, image, category, label, price, featured, description, id], (err, rows, fields)=>{
        if(!err){
            res.json({status: "Item updated"});
        }else{
            console.log(err);
        }
    });
});

router.delete('/items/:id', (req, res)=>{
    const {id} = req.params;
    mysqlConnection.query('DELETE FROM items WHERE id=?', [id],(err, rows, fields)=>{
        if(!err){
            res.json({status: "Item deleted!!"});
        }else{
            console.log("error!!!");
        }
    });
});
/********************************************************** */

router.get('/comments', (req, res) => {
    mysqlConnection.query('SELECT * FROM comments', (err, rows, fields)=>{
        if(!err){
            res.json(rows);
        }else {
            console.log(err);
        }
    });
});

router.get('/comments/:id',(req, res) =>{
    const {id} = req.params;
    console.log(id);
    mysqlConnection.query('SELECT * FROM comments WHERE id=?',[id],(err, rows, fields)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    });
});

router.post('/comments', (req, res)=>{
    const { rating, comment, author, date, itemId} = req.body;
    const query = ' INSERT INTO comments (rating, comment, author, date, itemId) VALUES( ?, ?, ?, ?, ?);';
    mysqlConnection.query(query, [ rating, comment, author, date, itemId], (err, rows, fields)=>{
        
        if(!err){
            res.json({id: rows.insertId, rating, comment, author, date, itemId});
        }else{
            console.log(err);
        }
    });
});

router.put('/comments/:id',(req, res)=>{
    const { rating, comment, author, date, itemId} = req.body;
    const {id} = req.params;
    const query = ' UPDATE comments set rating=?, comment=?, author=?, date=?, itemId=? WHERE id=?;';
    mysqlConnection.query(query, [ rating, comment, author, date, itemId, id], (err, rows, fields)=>{
        if(!err){
            res.json({status: "Comment updated"});
        }else{
            console.log(err);
        }
    });
});

router.delete('/comments/:id', (req, res)=>{
    const {id} = req.params;
    mysqlConnection.query('DELETE FROM comments WHERE id=?', [id],(err, rows, fields)=>{
        if(!err){
            res.json({status: "Comment deleted!!"});
        }else{
            console.log("error!!!");
        }
    });
});

module.exports = router;