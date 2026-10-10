const express = require('express')
const path = require('path')
const sportSectionsRouter = require('./routes/sportSections')
const sportSectionsService = require('./services/sportSectionsService')

const app = express()
const PORT = 3000

// данные секций хранятся в JSON-файле
const DATA_FILE_PATH = path.join(__dirname, 'data/sport-sections.json')
sportSectionsService.init(DATA_FILE_PATH)

// 1. middleware: разбирает JSON из тела запроса в req.body
app.use(express.json())

// 2. middleware: логируем каждый запрос в консоль
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
    next() // передаём запрос дальше, иначе он зависнет
})

// 3. маршруты секций
app.use('/sport-sections', sportSectionsRouter)

// 4. неизвестный маршрут
app.use((req, res) => {
    res.status(404).json({ error: 'Маршрут не найден' })
})

// 5. обработчик ошибок (например, кривой JSON в теле запроса)
app.use((err, req, res, next) => {
    console.error(err)
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({ error: 'Некорректный JSON в теле запроса' })
    }
    res.status(500).json({ error: 'Внутренняя ошибка сервера' })
})

app.listen(PORT, () => {
    console.log(`Сервер запущен по адресу http://localhost:${PORT}`)
})
