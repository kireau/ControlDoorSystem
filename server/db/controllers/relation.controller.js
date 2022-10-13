const db = require('../postgres')

class RelationController {
    async createRelation(idUser, idDoor) {
        const newRaw = await db.query(
            'INSERT INTO users_doors (id_user, id_door) values ($1, $2) RETURNING *',
            [idUser, idDoor]
        )
        // console.log(newRaw.rows[0])
    }
}

module.exports = new RelationController()