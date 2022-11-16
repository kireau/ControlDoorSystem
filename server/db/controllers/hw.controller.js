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

        //
        const keys = {
            "DoorID" : id_door,
            "Keys" : [
            "1b729b35a56065",
            "1b739b35a56061",
            "2b729b35a56061",
            "1b529b35a53061",
            "1a729b35a56061",
            "1b729b35a56061"
            ]  
        }
        
        // for (const el of keysID.rows) {
        //     keys.push( await userController.getUserChip(el.id_user))
        // }
  
    res.json(keys)
        
    }
}

module.exports = new HWController()