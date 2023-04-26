// Importações referentes ao JWT
const authJwtConfig = require('../configs/auth');
const { verify } = require("jsonwebtoken");

const AppError = require('../utils/AppError');

function ensureAuthenticated(request, response, next){
    const authHeader = request.headers.authorization;

    // verificação a existencia do token
    if(!authHeader){
        throw new AppError ('JWT não existente', 401);
    }

    // Caso o token exista, será colocado na posição 1 do array
    const [ , token] = authHeader.split(" ");

    // Verificação se o token é válido
    try {
        const { sub: user_id} = verify(token, authJwtConfig.jwt.secret);

        request.user = {
            id: Number(user_id),
        };

        return  next();

    } catch{
        throw new AppError ('JWT inválido', 401);
    }
}

module.exports = ensureAuthenticated;