// ДЗ, задача 2.7: сумма главной и побочной диагоналей квадратной матрицы.
//
// По теме: матрица посещаемости секции. Строка — тренировочная группа,
// столбец — неделя месяца, в ячейке — сколько спортсменов пришло.
// Главная диагональ — контрольная неделя каждой группы (группа i сдаёт нормативы в неделю i),
// побочная — зачётная неделя (группа i — в неделю n-1-i).
// Сумма диагоналей = сколько посещений пришлось на контрольные и зачётные тренировки.
export function getControlAttendance(attendanceMatrix) {
    const size = attendanceMatrix.length

    // матрица должна быть квадратной: в каждой строке столько же чисел, сколько строк
    const isSquare = attendanceMatrix.every(groupRow => groupRow.length === size)
    if (size === 0 || !isSquare) {
        return 0
    }

    let controlAttendance = 0
    for (let group = 0; group < size; group++) {
        controlAttendance += attendanceMatrix[group][group]            // главная диагональ
        controlAttendance += attendanceMatrix[group][size - 1 - group] // побочная диагональ
    }

    // при нечётном размере центральная ячейка лежит на обеих диагоналях — считаем её один раз
    if (size % 2 === 1) {
        const center = Math.floor(size / 2)
        controlAttendance -= attendanceMatrix[center][center]
    }

    return controlAttendance
}

// лежит ли ячейка на одной из диагоналей (для подсветки в таблице)
export function isDiagonalCell(size, group, week) {
    return group === week || group + week === size - 1
}
