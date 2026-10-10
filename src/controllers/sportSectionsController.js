const sportSectionsService = require('../services/sportSectionsService')

// слой обработки запросов: достаёт данные из запроса, вызывает сервис, выбирает код ответа

// поля, которые можно передать при создании и редактировании
const SPORT_SECTION_FIELDS = ['sportName', 'coachName', 'ageGroup', 'monthlyPrice', 'schedule', 'description', 'imageSrc']
const REQUIRED_FIELDS = ['sportName', 'coachName', 'ageGroup', 'monthlyPrice']

// берём из тела запроса только известные поля
const pickSportSectionFields = (body = {}) => {
    const sportSectionData = {}
    SPORT_SECTION_FIELDS.forEach(field => {
        if (body[field] !== undefined) {
            sportSectionData[field] = body[field]
        }
    })
    return sportSectionData
}

const isValidPrice = (monthlyPrice) => typeof monthlyPrice === 'number' && monthlyPrice > 0

// GET /sport-sections?sportName=фут
const getAllSportSections = (req, res) => {
    const { sportName } = req.query
    res.json(sportSectionsService.findAll(sportName))
}

// GET /sport-sections/:id
const getSportSectionById = (req, res) => {
    const id = parseInt(req.params.id)
    const sportSection = sportSectionsService.findOne(id)

    if (!sportSection) {
        return res.status(404).json({ error: 'Секция не найдена' })
    }

    res.json(sportSection)
}

// POST /sport-sections
const createSportSection = (req, res) => {
    const sportSectionData = pickSportSectionFields(req.body)

    const missingFields = REQUIRED_FIELDS.filter(field => sportSectionData[field] === undefined || sportSectionData[field] === '')
    if (missingFields.length > 0) {
        return res.status(400).json({ error: `Не заполнены поля: ${missingFields.join(', ')}` })
    }
    if (!isValidPrice(sportSectionData.monthlyPrice)) {
        return res.status(400).json({ error: 'monthlyPrice должен быть положительным числом' })
    }

    const newSportSection = sportSectionsService.create(sportSectionData)
    res.status(201).json(newSportSection)
}

// PATCH /sport-sections/:id
const updateSportSection = (req, res) => {
    const id = parseInt(req.params.id)
    const sportSectionData = pickSportSectionFields(req.body)

    if (sportSectionData.monthlyPrice !== undefined && !isValidPrice(sportSectionData.monthlyPrice)) {
        return res.status(400).json({ error: 'monthlyPrice должен быть положительным числом' })
    }

    const updatedSportSection = sportSectionsService.update(id, sportSectionData)
    if (!updatedSportSection) {
        return res.status(404).json({ error: 'Секция не найдена' })
    }

    res.json(updatedSportSection)
}

// DELETE /sport-sections/:id
const deleteSportSection = (req, res) => {
    const id = parseInt(req.params.id)
    const isRemoved = sportSectionsService.remove(id)

    if (!isRemoved) {
        return res.status(404).json({ error: 'Секция не найдена' })
    }

    res.status(204).send() // 204 No Content: удалено, тело ответа пустое
}

module.exports = {
    getAllSportSections,
    getSportSectionById,
    createSportSection,
    updateSportSection,
    deleteSportSection,
}
