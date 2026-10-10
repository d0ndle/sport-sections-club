const fs = require('fs')

// слой работы с файлом: прочитать JSON-файл в массив и записать массив обратно
const readData = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8')
        return JSON.parse(data)
    } catch (err) {
        console.error('Ошибка чтения файла:', err)
        return []
    }
}

const writeData = (filePath, data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8')
    } catch (err) {
        console.error('Ошибка записи файла:', err)
    }
}

module.exports = { readData, writeData }
