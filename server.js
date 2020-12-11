const express = require('express')
const apiRouter = require('./apiRouter').router
let bodyParser = require('body-parser')



const app = express()
const port = 9000


//Body Parser configuration
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/',  (req, res)=> {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Bonjour sur mon server</h1>');
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});



app.use('/api/', apiRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


