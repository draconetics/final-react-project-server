const express = require('express');
const app = express();


//Settings.- Server configuration.
//THE CLOUD give as a port.

app.set('port', process.env.PORT || 3001);

//Server middlewares.(function before basic functions)
//access to the information about json
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
       next();
 });
 
app.use(express.json());


//Routes .- urls about server
//app.use(require('./routes/employees'));
app.use(require('./routes/galery'));



app.listen(app.get('port'), () => {
    console.log('server on port 3001', app.get('port'));
});


