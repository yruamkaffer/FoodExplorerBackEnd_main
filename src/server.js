// Tratamento de exceções

require('express-async-errors');
require("dotenv/config")
const AppError = require('./utils/AppError');

// Importando arquivo de configurações das imagens enviadas
const uploadConfig = require('./configs/upload');
const uploadAvatarConfig = require('./configs/uploadAvatar');

// Importando o CORS
const initCors = require("cors");

// Importando conexão com banco de dados relacional
const databaseMigrationsRun = require('./database/sqlite/migrations');

// Importando bibliotecas
const express = require("express");

// Importando rotas (ele vai buscar o arquivo index.js)
const routes = require('./routes');

// Executando o banco de dados
databaseMigrationsRun();

// Inicializando biblioteca
const app = express();
// Inicilização do cors logo após o app
app.use(initCors())

// Atribuindo o tipo de dado que será enviado pelo body e as rotas que serão utilizadas
app.use(express.json());

// Buscando por arquivo estáticos 
app.use("/files/dishFiles", express.static(uploadConfig.UPLOADS_FOLDER))
app.use("/files/avatarFiles", express.static(uploadAvatarConfig.UPLOADSAVATAR_FOLDER))

app.use(routes)



app.use((error, request, response, next) => {
    // Sabendo se é um error gerado pelo client
    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message
        });
    }

    console.error(error);

    // erro "padrão" do servidor
    return response.status(500).json({
        status: 'error',
        message: "Internal server error"
    })
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`O servidor local com node está rodando na porta: ${PORT}`)
});