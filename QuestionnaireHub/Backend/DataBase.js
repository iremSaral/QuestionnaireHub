// Veri tabanı bilgileri, bağlantısı
import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "19Hunat.",
  database: "DataHub"
});

export default db;
