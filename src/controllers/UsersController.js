// Importando depêndencias
const { hash, compare } = require('bcryptjs');

const AppError = require('../utils/AppError');

// Importando conexão com db
const sqliteConnection = require('../database/sqlite')

class UsersController{
    async create(request, response) {
        // Parâmetros enviados pelo body
        const {name, email, password} = request.body;
        
        // Conexão com o banco de dados
        const database = await sqliteConnection();

        // Conferindo a criação de usuários existentes
        // Conferência para saber se o usuário já existe no db
        const checkUserExist = await database.get("SELECT * FROM users WHERE email = (?)", [email])
        // Agora com o retorno no db, se faz a condição
        if(checkUserExist){
            throw new AppError("Este e-mail já está em uso")
        }


        // Criptografia
        const hashedPassword = await hash(password, 8);

        // Criando o usuário
        // Inserção de dados
        await database.run(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]
            );


        return response.status(201).json()
    }

    async update(request,response){
        const { name, email, password, old_password } = request.body;
        const user_id = request.user.id

        const database = await sqliteConnection();

        const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]);

        // Verificação se o usuário existe
        if (!user){
            throw new AppError ("Usuário não encontrado");
        }

        const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

        // Verificando se ele encontrou um email e se email já está em uso
        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
            throw new AppError ("Este e-mail já está em uso!");
        }

        // Atribuindo novos valores para os campos no banco de dados, caso exista. Caso não exista, será mantido o valor do banco de dados
        user.name = name ?? user.name;
        user.email = email ?? user.email;

        // Verificação da senha
        // SE for informada a nova senha, porém, não for informado a senha antiga:
        if (password && !old_password){
            throw new AppError  ("Para redefinir a senha é necessário informar a antiga");
        }

        // SE a nova senha e a antiga senha forem informados:
        if (password && old_password){
            // Verificando se a old_password é REALMENTE a senha que consta no db
            const checkOldPassword = await compare(old_password, user.password);

            if(checkOldPassword){
                if (password === old_password){
                    throw new AppError ("A nova senha informada é exatamente igual à anterior")
                }

            } else if(!checkOldPassword){
                // Se a senha informada não bater com a senha que está no db
                throw new AppError ("A senha antiga não confere")
            }
        

            // Atualizando a senha com criptografia
            user.password = await hash(password, 8)
        }

        // Atualizando os valores
        await database.run(`
            UPDATE users SET
            name = ?,
            email = ?,
            password = ?,
            updated_at = DATETIME('now')
            WHERE id = ?`,
            [
            user.name, 
            user.email,
            user.password, 
            user_id]
            );

            return response.status(200).json();
    }
};

// Exportando
module.exports = UsersController;