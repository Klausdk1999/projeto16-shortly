import pg from 'pg';

const { Pool } = pg;

const databaseConfig = {
  
   host: 'localhost',
   port: 5432,
   user: 'postgres',
   password: '123',
   database: 'shortly'
}

const connection = new Pool(databaseConfig);

export default connection;

//import dotenv from "dotenv";

// connectionString: process.env.DATABASE_URL,
// ssl:{
//          rejectUnautorized: false
//}