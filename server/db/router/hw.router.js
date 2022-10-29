const Router = require('express')
const router = new Router()
const hwController = require('../controllers/hw.controller')

router.get('/:id', hwController.getKeyList) // отправить список ключей
router.post('/getKey/:doorName', hwController.getKeyFromDoor) // запрос ключа от двери

module.exports = router