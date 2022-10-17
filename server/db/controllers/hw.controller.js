const db = require('../postgres')
const userController = require('../controllers/users.controller')

class HWController {
    // отправка списка ключей для двери
    async getKeyList(req, res) {
        const id_door = req.params.id
        // const keysID = await db.query(
        //     'SELECT id_user from users_doors WHERE id_door = $1',
        //     [id_door]
        // )
        // console.log(keysID.rows)

        const keys = [id_door, '2a', '3', '4', '5', '6', '7', '8', '9']
        // for (const el of keysID.rows) {
        //     keys.push( await userController.getUserChip(el.id_user))
        // }
  
    res.json(keys)
        
    }
}

module.exports = new HWController()