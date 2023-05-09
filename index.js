/*import */
const app = require('./app'); 
const PORT = process.env.PORT || 9000;
const mongodb = require('./config/dbs')


mongodb();

app.listen( PORT, ()=>{
    console.log('SERVER IS RUNNING ON', `http://localhost:${PORT}`)
})