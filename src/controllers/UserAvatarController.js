const sqliteConnection = require('../database/sqlite')

const AppError = require('../utils/AppError');
const DiskStorage = require("../providers/DiskStorageAvatar")


class UserAvatarController {
    async update(request,response){
        const user_id = request.user.id
        const avatarFilename = request.file.filename;

        const diskStorage = new DiskStorage()

        const database = await sqliteConnection();

        const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]);

        if(!user){
            throw new AppError("Somente usuários autenticados podem alterar a imagem de avatar",401)
        }

        if(user.avatar){
            // deletando a foto antiga, se houver
            await diskStorage.deleteFile(user.avatar);
        }

        // Fazendo a troca
        const filename = await diskStorage.saveFile(avatarFilename);
        user.avatar = filename;

        // Atualizando os campos no db
        await database.run(`
        UPDATE users SET
        avatar = ?
        WHERE id = ?`,
        [
        user.avatar, 
        user_id]
        )


        return response.json(user)

    }
}

module.exports = UserAvatarController;