const mongoose = require('mongoose');
const  {MONGOURL} = require('./keys')

const MongooConnectDB = async ()=>{
     try{
            const conn = await mongoose.connect(MONGOURL,{
                 useNewUrlParser:true,
                 useUnifiedTopology:true
            }
                );

     console.log(`mongooseDB connected ${conn.connection.host}`.cyan.underline.bold);
     }catch(err){
           if(err){
                console.log(`ERROR ${err.message}`.red)
                process.exit(1);
           }
     }
}


module.exports = MongooConnectDB;