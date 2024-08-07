// utils/db.js
import sql from 'mssql';

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true, // For Azure SQL
    enableArithAbort: true
  }
};

export const dbConnection = async () => {
  try {
    await sql.connect(dbConfig);
    console.log('Connected to MSSQL');
  } catch (err) {
    console.error('Database connection failed:', err);
  }
};

export default sql;
