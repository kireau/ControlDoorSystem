const db = require("../postgres");
const relationController = require("./relation.controller");

class UserController {
  //СТАНДАРТНЫЕ ФУНКЦИИ
  async createUser(req, res) {
    const { name, login, password, role, chip, doors } = req.body; // doors - массив ИД дверей
    // создаём юзера
    try {
      const newRaw = await db
      .query(
        "INSERT INTO users (name, login, password, role, chip) values ($1, $2, $3, $4, $5) RETURNING *",
        [name, login, password, role, chip]
      )
        // Привязываем к нему двери
        const userId = newRaw.rows[0].id;

        doors.forEach((doorsId) => {
          // console.log(doorsId)
          relationController.createRelation(userId, doorsId);
        });

        res.json(newRaw.rows);

    } catch (error) {
      console.log(`ОШИБКА!!! ${error.detail}`)
        res.status(500).send({error: error.detail})
    } 
  }
  

  async getAllUsersName(req, res) {
    const users = await db.query("SELECT id, name from users");
    res.json(users.rows);
  }

  async getAllUsersRole(req, res) {
    const usersRole = await db.query("SELECT role FROM users");
    res.json(usersRole.rows);
  }
  async updateUser(req, res) {}
  async deleteUser(req, res) {
    const id = req.params.id;
    const user = await db.query("DELETE from users WHERE id = $1", [id]);
    res.json(user.rows[0]);
  }
  //ВНУТРЕННИЕ ФУНКЦИИ
  //получить чип юзера
  async getUserChip(idUser) {
    const userChip = await db.query("SELECT chip from users WHERE id = $1", [
      idUser,
    ]);
    // console.log(userChip.rows[0].chip)
    return userChip.rows[0].chip;
  }
  //проверить привязку юзера к двери
  async checkUserDoor(req, res) {
    const user = req.params.user;
    const door = req.params.door;

    const userID = await db.query("SELECT id from users WHERE name = $1", [
      user,
    ]);
    const doorID = await db.query("SELECT id from doors WHERE name = $1", [
      door,
    ]);
    const check = await db.query(
      "SELECT * from users_doors WHERE id_user = $1 AND id_door = $2",
      [userID.rows[0].id, doorID.rows[0].id]
    );
    // console.log(check.rows[0])
    const access = check.rows[0] ? "true" : "false";
    // console.log(access)

    res.json(access);
  }
  // Сформировать данные таблицы + хэдер
  async tableData(req, res) {
    // запрашиваем три таблицы из БД
    const usersTable = await db.query('SELECT * from users')
    const doorsTable = await db.query('SELECT * from doors')
    const relationsTable = await db.query('SELECT * from users_doors')

    // заготовка ответа
    let tableInfo = {
      headers: [
        {
          text: 'Дейтсвия',
          value: 'actions',
          sortable: false,
        },
        {
          text: 'Сотрудник',
          align: 'start',
          value: 'name',
        },
      ],
      items: [],
    }
     
    // формируем строку хэдера
    const doorName = doorsTable.rows.map((el) => {
      let elMod = {
          text: el.name,
          value: `access${el.id}`,
          id: el.id,
      }
      return elMod
    })

    tableInfo.headers = tableInfo.headers.concat(doorName)

    // строки данных
    let completRow = []
    // для каждого юзера..
    for (const el1 of usersTable.rows) { 
      let elRow = {
        name: el1.name,
        userID: el1.id,
      } 
      // ..берем каждую дверь..
      for (const el2 of doorName) { 
        elRow[el2.value] = 'false' // дефолтное значение 'false'
        // ..и ищем связь
        for (const el3 of relationsTable.rows) { 
          if (el3.id_user === el1.id && el3.id_door === el2.id) {
            elRow[el2.value] = 'true' 
            break
          }     
        }
      }
      completRow.push(elRow)
    }
    tableInfo.items = completRow


    res.json(tableInfo)
  }
}

module.exports = new UserController();
