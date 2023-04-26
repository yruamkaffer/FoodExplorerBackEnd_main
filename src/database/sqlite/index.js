// Import do banco de dados
const sqlite3 = require('sqlite3');
const { open } = require('sqlite')

// Imports auxiliares
const path = require('path');

async function sqliteConnection(){
    // conexão c/db
    const database = await open({
        filename: path.resolve(__dirname, "..", "database.db"),

        // comunicação c/ db
        driver: sqlite3.Database
    });

    return database;
}


// Exportando
module.exports = sqliteConnection;