const express = require('express')
const router = express.Router()
const sportSectionsController = require('../controllers/sportSectionsController')

// маршруты: метод + путь -> функция контроллера
router.get('/', sportSectionsController.getAllSportSections)
router.get('/:id', sportSectionsController.getSportSectionById)
router.post('/', sportSectionsController.createSportSection)
router.patch('/:id', sportSectionsController.updateSportSection)
router.delete('/:id', sportSectionsController.deleteSportSection)

module.exports = router
