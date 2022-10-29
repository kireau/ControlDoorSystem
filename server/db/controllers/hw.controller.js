const db = require('../postgres')
const userController = require('../controllers/users.controller')

class HWController {
    // отправка списка ключей для двери
    async getKeyList(req, res) {
        const id_door = req.params.id
        const keysID = await db.query(
            'SELECT id_user from users_doors WHERE id_door = $1',
            [id_door]
        )
        console.log(keysID.rows)
        // перебор массива и получение ключей по ID юзера
        const keys = []
        for (const el of keysID.rows) {
            keys.push( await userController.getUserChip(el.id_user))
        }
  
    res.json(keys)
    }
    // запрос ключа из двери 
    // !!!!!!!!!!!!!!ШАБЛОН!!!!!!!!!!!!!!!
    async getKeyFromDoor(req, res) {
        const name = req.params.doorName
        const door = await db.query(
            'SELECT * FROM doors WHERE name = $1',
            [name]
        )
        ////////////////
        // Здесь нужно организовать ПОСТ-запрос к двери
        ////////////////
        res.json(door.rows[0].id + door.rows[0].name)
    }
}

module.exports = new HWController()