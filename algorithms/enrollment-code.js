// ДЗ, задача 3.4: сортировка букв в словах по алфавиту, затем самих слов;
// у каждого слова первая буква прописная, остальные строчные.
//
// По теме: из ФИО спортсмена получаем код заявки на запись в секцию.
// «Крючков Даниил» -> «Адиилн Вккорчю»
export function getEnrollmentCode(athleteName) {
    // строка -> массив слов (лишние пробелы отбрасываем)
    const nameQueue = athleteName.trim().split(/\s+/).filter(word => word !== '')
    const codeWords = []

    // цикл с условием не по счётчику: работаем, пока в очереди остаются слова
    while (nameQueue.length > 0) {
        const word = nameQueue.shift()

        // буквы слова по алфавиту; localeCompare('ru') правильно сравнивает русские буквы, включая ё
        const sortedLetters = word
            .toLowerCase()
            .split('')
            .sort((first, second) => first.localeCompare(second, 'ru'))
            .join('')

        codeWords.push(sortedLetters[0].toUpperCase() + sortedLetters.slice(1))
    }

    // теперь по алфавиту сортируем сами слова
    codeWords.sort((first, second) => first.localeCompare(second, 'ru'))

    return codeWords.join(' ')
}
