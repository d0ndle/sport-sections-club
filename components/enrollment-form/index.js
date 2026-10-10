import { addEnrollmentApplication, getEnrollmentApplications } from '../../data/enrollment-applications.js'

// форма записи в секцию: по ФИО создаётся заявка с кодом (ДЗ, задача 3.4)
export class EnrollmentFormComponent {
    constructor(parent) {
        this.parent = parent
    }

    get applicationsList() {
        return document.getElementById('enrollment-applications')
    }

    getApplicationsHTML(sportSectionId) {
        const enrollmentApplications = getEnrollmentApplications(sportSectionId)
        if (enrollmentApplications.length === 0) {
            return '<li class="list-group-item text-muted">Заявок пока нет</li>'
        }
        return enrollmentApplications
            .map(enrollmentApplication => `
                <li class="list-group-item d-flex justify-content-between">
                    <span>${enrollmentApplication.athleteName}</span>
                    <b>${enrollmentApplication.enrollmentCode}</b>
                </li>
            `)
            .join('')
    }

    addListeners(sportSectionId) {
        document
            .getElementById('enrollment-submit')
            .addEventListener('click', () => {
                const athleteNameInput = document.getElementById('enrollment-athlete-name')
                if (athleteNameInput.value.trim() === '') return

                addEnrollmentApplication(athleteNameInput.value, sportSectionId)
                athleteNameInput.value = ''
                this.applicationsList.innerHTML = this.getApplicationsHTML(sportSectionId)
            })
    }

    getHTML(sportSectionId) {
        return (
            `
                <div class="card club-panel">
                    <div class="card-body">
                        <h5 class="club-card__title">Записаться в секцию</h5>
                        <div class="d-flex gap-2 mb-3">
                            <input id="enrollment-athlete-name" class="form-control club-filter" type="text"
                                   placeholder="ФИО спортсмена">
                            <button id="enrollment-submit" class="btn club-btn club-btn--red" type="button">Записаться</button>
                        </div>
                        <p class="text-muted small mb-2">Заявки и их коды</p>
                        <ul id="enrollment-applications" class="list-group">
                            ${this.getApplicationsHTML(sportSectionId)}
                        </ul>
                    </div>
                </div>
            `
        )
    }

    render(sportSectionId) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(sportSectionId))
        this.addListeners(sportSectionId)
    }
}
