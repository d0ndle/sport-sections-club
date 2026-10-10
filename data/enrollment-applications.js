import { getEnrollmentCode } from '../algorithms/enrollment-code.js'

// коллекция заявок спортсменов на запись в секции
const enrollmentApplications = []

// создаём объект заявки и кладём его в коллекцию
export function addEnrollmentApplication(athleteName, sportSectionId) {
    const enrollmentApplication = {
        athleteName: athleteName.trim(),
        sportSectionId: Number(sportSectionId),
        enrollmentCode: getEnrollmentCode(athleteName),
    }
    enrollmentApplications.push(enrollmentApplication)
    return enrollmentApplication
}

// заявки одной секции
export function getEnrollmentApplications(sportSectionId) {
    return enrollmentApplications.filter(
        enrollmentApplication => enrollmentApplication.sportSectionId === Number(sportSectionId)
    )
}
