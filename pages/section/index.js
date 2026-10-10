import { ClubHeaderComponent } from '../../components/club-header/index.js'
import { SportSectionDetailsComponent } from '../../components/sport-section-details/index.js'
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
    }
}
