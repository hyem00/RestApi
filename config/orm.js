import SequelizeAuto from "sequelize-auto";
import dotenv from 'dotenv'

dotenv.config();

const auto = new SequelizeAuto(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASS,{
    host : process.env.DB_HOST,
    dialect : 'mysql',
    port : 3306 ,
    additional :{
        timestamp : false
    }
})

auto.run((err)=>{
    if(err) throw err;
})