import pg from 'pg';

const { Pool } = pg;

const databaseConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
}

const connection = new Pool(databaseConfig);

export default connection;

// import pg from 'pg';

// const { Pool } = pg;

// const databaseConfig = {
  
//    host: 'localhost',
//    port: 5432,
//    user: 'postgres',
//    password: '123',
//    database: 'shortly'
// }

// const connection = new Pool(databaseConfig);

// export default connection;
