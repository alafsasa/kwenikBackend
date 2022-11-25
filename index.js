const express = require('express');
const db = require('./bin/config/db.config');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

//some data
const post = [
    {
        username: 'alafsasa',
        title: 'post1',
        age: 26,
        town: 'Eldoret'
    },
    {
        username: 'Alfred',
        title: 'post2',
        age: 26,
        town: 'Nakuru'
    }
];

//test route
app.get('/', (req, res) => {
    res.send(post);
});

//parse requests of content-type-application/json
app.use(bodyParser.json());
//parse requests of content-type-application/x-www/form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//app routes
require('./bin/routes/index.routes')(app);

//start
app.listen(PORT, ()=>{
    console.log(`Kwenik running on PORT: ${PORT}`);
});


//coonect to DB
//clean db on every start
db.sequelize.sync({force: true});
//retain data
//db.sequelize;