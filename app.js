
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const colors = require('colors');
//const {FRONTEND_URL} = require('./config/keys')



/*load routes*/
const RouterUser = require('./router/user')
app.use(express.json());
//body parser
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json())

//configure Header HTTP
app.use((rew, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
})
/*router basic*/ 
//router basic

app.use(cors());
app.use(RouterUser);
//export
module.exports = app