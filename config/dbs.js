const mongoose = require('mongoose');
const  {MONGO_URL} = require('./keys')

mongoose.set("useFindAndModify", false);
const MongooConnectDB = async ()=>{
     try{
            const conn = await mongoose.connect(MONGO_URL,{
                 useNewUrlParser:true,
                 useCreateIndex:true,
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