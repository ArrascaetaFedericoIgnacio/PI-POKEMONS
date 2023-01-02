const DB_USER = process.env.DB_USER || "postgres";
const DB_PASSWORD = process.env.DB_PASSWORD || "admin";
const DB_NAME = process.env.DB_NAME || "pokemons";
const DB_HOST = process.env.DB_HOST || "localhost";

const PORT = process.env.PORT || 3001;

module.exports = { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, PORT };
