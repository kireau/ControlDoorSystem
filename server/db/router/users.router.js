const Router = require('express')
const router = new Router()
const usersController = require('../controllers/users.controller')

router.post('/', usersController.createUser) // Создать юзера
router.get('/', usersController.getAllUsers) // Вывести всех юзеров
router.get('/:id', usersController.getOneUser) // Вывести одного юзера
router.put('/', usersController.updateUser) // Обновить юзера
router.delete('/:id', usersController.deleteUser) // Удалить юзера

module.exports = router