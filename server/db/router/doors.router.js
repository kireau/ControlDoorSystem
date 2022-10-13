const Router = require('express')
const router = new Router()
const doorsController = require('../controllers/doors.controller')

router.post('/', doorsController.createDoor)    // Создать дверь
router.get('/', doorsController.getAllDoors)    // Вывести все строки
router.get('/:id', doorsController.getOneDoor)    // Вывести строку по id
router.put('/', doorsController.updateDoor)    // Изменить название двери
router.delete('/:id', doorsController.deleteDoor) // Удалить дверь 

module.exports = router