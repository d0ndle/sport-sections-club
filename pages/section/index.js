import { ClubHeaderComponent } from '../../components/club-header/index.js'
import { SportSectionDetailsComponent } from '../../components/sport-section-details/index.js'
import { ClubBallModelComponent } from '../../components/club-ball-model/index.js'
import { AttendanceTableComponent } from '../../components/attendance-table/index.js'
import { EnrollmentFormComponent } from '../../components/enrollment-form/index.js'
import { SectionsPage } from '../sections/index.js'
import { getSportSectionById } from '../../data/sport-sections.js'

// страница «Подробнее» об одной секции
export class SectionPage {
    constructor(parent, id) {
        this.parent = parent
        this.id = id
    }

    get pageRoot() {
        return document.getElementById('section-details-root')
    }

    getHTML() {
        return (
            `
                <div id="section-page">
                    <div id="club-header-root"></div>
                    <main class="container py-4">
                        <div id="section-details-root"></div>
                        <div class="row g-4 mt-1">
                            <div id="section-model-root" class="col-lg-5"></div>
                            <div id="section-attendance-root" class="col-lg-7"></div>
                            <div id="section-enrollment-root" class="col-12"></div>
                        </div>
                    </main>
                </div>
            `
        )
    }

    clickHome() {
        const sectionsPage = new SectionsPage(this.parent)
        sectionsPage.render()
    }

    render() {
        this.parent.innerHTML = ''
        this.parent.insertAdjacentHTML('beforeend', this.getHTML())

        const clubHeader = new ClubHeaderComponent(document.getElementById('club-header-root'))
        clubHeader.render(this.clickHome.bind(this))

        const sportSection = getSportSectionById(this.id)
        const sportSectionDetails = new SportSectionDetailsComponent(this.pageRoot)
        sportSectionDetails.render(sportSection)

        const clubBallModel = new ClubBallModelComponent(document.getElementById('section-model-root'))
        clubBallModel.render()

        const attendanceTable = new AttendanceTableComponent(document.getElementById('section-attendance-root'))
        attendanceTable.render(sportSection.attendanceMatrix)

        const enrollmentForm = new EnrollmentFormComponent(document.getElementById('section-enrollment-root'))
        enrollmentForm.render(sportSection.id)
    }
}
