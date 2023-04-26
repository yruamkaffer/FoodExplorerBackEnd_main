// Importando o knexfile.js
const config = require("../../../knexfile");

// Importando a biblioteca knex
const knex = require("knex");

// Atribuindo na constante connection a conexão do knex com o objeto development criado na knexfiles
const connection = knex(config.development);

// Exportando a conexão
module.exports = connection;