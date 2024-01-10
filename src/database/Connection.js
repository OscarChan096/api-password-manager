import sql from 'mssql';
import { config } from 'dotenv';

config();

const configdb = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    server: process.env.SERVER,
    database: process.env.DATABASE,
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}

export const getConnection = async () => {
    try{
        return await sql.connect(configdb);
    }catch(error){
        console.log(error.message);
    }
}

export { sql };