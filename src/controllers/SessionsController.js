// Importando a conexão com o banco de dados
const knex = require('../database/knex');

// Importando depêndencias
const {compare} = require('bcryptjs');

// Importando arquivo de configuração do jsonWebToken e o método sign
const authJwtConfig = require('../configs/auth');
const { sign } = require('jsonwebtoken');

const AppError = require("../utils/AppError.js");


class SessionsController{
    async create(request, response){
        const { email, password } = request.body;

        // Validação de usuário
        const user = await knex("users").where({ email }).first();

        if(!user){
            throw new AppError ("E-mail e/ou senha incorreta", 401);
        }

        // Validação de senha
        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched){
            throw new AppError ("E-mail e/ou senha incorreta", 401);
        }

        // Gerando um Token de autenticação
        const { secret, expiresIn } = authJwtConfig.jwt;

        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        })

        return response.json({user, token});
    }
};

module.exports = SessionsController;