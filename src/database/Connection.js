import pkg from 'pg';
import { config } from 'dotenv';

config();

const { Pool } = pkg;

const pool = new Pool({
    //user: process.env.USER,
    user: 'admin',
    password: process.env.PASSWORD,
    host: process.env.SERVER,   // en PostgreSQL se usa 'host' en lugar de 'server'
    database: process.env.DATABASE,
    port: process.env.DB_PORT || 5432, // puerto por defecto de PostgreSQL
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
});

// función para obtener conexión
/*export const getConnection = async () => {
    try {
        return pool; // devolvemos el pool, ya listo para consultas
    } catch (error) {
        console.error('Error al conectar con PostgreSQL:', error.message);
    }
};*/

export { pool };