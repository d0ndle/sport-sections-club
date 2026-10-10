const fileService = require('./fileService')

// слой бизнес-логики: что можно делать с секциями
let dataFilePath

const init = (filePath) => {
    dataFilePath = filePath
}

// список секций; если передан sportName — только те, где он входит в название
const findAll = (sportName) => {
    const sportSections = fileService.readData(dataFilePath)
    if (sportName) {
        return sportSections.filter(sportSection =>
            sportSection.sportName.toLowerCase().includes(sportName.toLowerCase())
        )
    }
    return sportSections
}

const findOne = (id) => {
    const sportSections = fileService.readData(dataFilePath)
    return sportSections.find(sportSection => sportSection.id === id)
}

const create = (sportSectionData) => {
    const sportSections = fileService.readData(dataFilePath)

    // новый id = максимальный id + 1
    const newId = sportSections.length > 0
        ? Math.max(...sportSections.map(sportSection => sportSection.id)) + 1
        : 1

    const newSportSection = { id: newId, ...sportSectionData }
    sportSections.push(newSportSection)
    fileService.writeData(dataFilePath, sportSections)

    return newSportSection
}

const update = (id, sportSectionData) => {
    const sportSections = fileService.readData(dataFilePath)
    const index = sportSections.findIndex(sportSection => sportSection.id === id)

    if (index === -1) return null

    // поля из запроса перезаписывают старые, id менять нельзя
    sportSections[index] = { ...sportSections[index], ...sportSectionData, id }
    fileService.writeData(dataFilePath, sportSections)

    return sportSections[index]
}

const remove = (id) => {
    const sportSections = fileService.readData(dataFilePath)
    const filteredSportSections = sportSections.filter(sportSection => sportSection.id !== id)

    if (filteredSportSections.length === sportSections.length) {
        return false // секции с таким id не было
    }

    fileService.writeData(dataFilePath, filteredSportSections)
    return true
}

module.exports = { init, findAll, findOne, create, update, remove }
