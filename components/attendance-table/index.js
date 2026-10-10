import { getControlAttendance, isDiagonalCell } from '../../algorithms/attendance-diagonals.js'

// таблица посещаемости секции; диагонали подсвечены, под таблицей их сумма (ДЗ, задача 2.7)
export class AttendanceTableComponent {
    constructor(parent) {
        this.parent = parent
    }

    getRowsHTML(attendanceMatrix) {
        const size = attendanceMatrix.length
        return attendanceMatrix
            .map((groupRow, group) => {
                const cells = groupRow
                    .map((visits, week) => {
                        const cellClass = isDiagonalCell(size, group, week) ? 'club-attendance__diagonal' : ''
                        return `<td class="${cellClass}">${visits}</td>`
                    })
                    .join('')
                return `<tr><th>Группа ${group + 1}</th>${cells}</tr>`
            })
            .join('')
    }

    getHTML(attendanceMatrix) {
        const weeksHTML = attendanceMatrix.map((_, week) => `<th>Нед. ${week + 1}</th>`).join('')
        return (
            `
                <div class="card club-panel">
                    <div class="card-body">
                        <h5 class="club-card__title">Посещаемость</h5>
                        <table class="table table-sm text-center club-attendance">
                            <thead><tr><th></th>${weeksHTML}</tr></thead>
                            <tbody>${this.getRowsHTML(attendanceMatrix)}</tbody>
                        </table>
                        <p class="mb-0">Контрольные и зачётные тренировки (сумма диагоналей):
                            <b class="club-card__price">${getControlAttendance(attendanceMatrix)}</b>
                        </p>
                    </div>
                </div>
            `
        )
    }

    render(attendanceMatrix) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(attendanceMatrix))
    }
}
