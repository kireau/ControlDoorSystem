const db = require('../postgres')

class DoorsController {
    // создать дверь
    async createDoor(req, res) {
        const { name } = req.body
        const newRaw = await db.query(
            'INSERT INTO doors (name) values ($1) RETURNING *',
            [name]
        )
        res.json(newRaw.rows[0])
    }    
    // получить список дверей
    async getAllDoorsName(req, res) {
        const doors = await db.query('SELECT * from doors')
        const doorName = doors.rows.map((el, i) => {
            let elMod = {
                text: el.name,
                value: `access${i}`
            }
            return elMod
        
        })
        // res.json(doors.rows)
        res.json(doorName)
    }
    // получить дверь по ID
    async getOneDoor(req, res) {
        const id = req.params.id
        const door = await db.query(
            'SELECT * from doors WHERE id = $1',
            [id]
        )
        res.json(door.rows[0])
    }
    // изменить дверь
    async updateDoor(req, res) {
        const { id, name } = req.body
        const door = await db.query(
            'UPDATE doors set name = $1 WHERE id = $2 RETURNING *',
            [name, id]
        )
        res.json(door.rows[0])
    }
    // удалить дверь
    async deleteDoor(req, res) {
        const id = req.params.id
        const door = await db.query(
            'DELETE from doors WHERE id = $1',
            [id]
        )
        res.json(door.rows[0])
    }    
}

module.exports = new DoorsController()