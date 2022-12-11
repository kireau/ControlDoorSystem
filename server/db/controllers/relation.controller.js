const db = require('../postgres')

class RelationController {
    async createRelation(idUser, idDoor) {
        const newRaw = await db.query(
            'INSERT INTO users_doors (id_user, id_door) values ($1, $2) RETURNING *',
            [idUser, idDoor]
        )
        // console.log(newRaw.rows[0])
    }

    async updateRelation(idUser, doors) {
        await db.query('DELETE from users_doors WHERE id_user = $1', [idUser])
        await doors.forEach((idDoor) => this.createRelation(idUser, idDoor))
    }
}

module.exports = new RelationController()