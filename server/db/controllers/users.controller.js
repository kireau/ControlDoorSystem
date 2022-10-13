const db = require('../postgres')
const relationController = require('./relation.controller')


class UserController {
    //СТАНДАРТНЫЕ ФУНКЦИИ
async createUser(req, res) {
    const { name, login, password, role, chip, doors} = req.body // doors - массив ИД дверей
    // создаём юзера
    const newRaw = await db.query(
        'INSERT INTO users (name, login, password, role, chip) values ($1, $2, $3, $4, $5) RETURNING *',
        [name, login, password, role, chip]
    )
    res.json(newRaw.rows)
    // Привязываем к нему двери
    const userId = newRaw.rows[0].id

    doors.forEach( doorsId => {
        // console.log(doorsId)
        relationController.createRelation(userId, doorsId)
    })
}
async getAllUsers(req, res) {

}
async getOneUser(req, res) {

}
async updateUser(req, res) {

}
async deleteUser(req, res) {
    const id = req.params.id
    const user = await db.query(
        'DELETE from users WHERE id = $1',
        [id]
    )
    res.json(user.rows[0])
}    
    //ВНУТРЕННИЕ ФУНКЦИИ
async getUserChip(idUser) {
    const userChip = await db.query(
        'SELECT chip from users WHERE id = $1',
        [idUser]
    )
    // console.log(userChip.rows[0].chip)
    return userChip.rows[0].chip
}
    

}

module.exports = new UserController