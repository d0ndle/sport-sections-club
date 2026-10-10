import { ClubHeaderComponent } from '../../components/club-header/index.js'
import { SectionsFilterComponent } from '../../components/sections-filter/index.js'
import { SportSectionCardComponent } from '../../components/sport-section-card/index.js'
import { SectionPage } from '../section/index.js'
import {
    getSportSections,
    addSportSectionCopy,
    removeSportSection,
} from '../../data/sport-sections.js'

// главная страница: фильтр, кнопка «Добавить» и список карточек секций
export class SectionsPage {
    constructor(parent) {
        this.parent = parent
        this.filterText = ''
    }

    get cardsRoot() {
        return document.getElementById('sections-list')
    }

    getHTML() {
        return (
            `
                <div id="sections-page">
                    <div id="club-header-root"></div>
                    <main class="container py-4">
                        <h1 class="club-page-title">Запись в спортивные секции</h1>
                        <div class="d-flex gap-2 mb-4">
                            <div id="sections-filter-root" class="flex-grow-1"></div>
                            <button id="section-add" class="btn club-btn club-btn--blue" type="button">Добавить</button>
                        </div>
                        <div id="sections-list" class="club-cards"></div>
                    </main>
                </div>
            `
        )
    }

    // «Домой» на главной просто сбрасывает фильтр и перерисовывает страницу
    clickHome() {
        this.filterText = ''
        this.render()
    }

    inputFilter(e) {
        this.filterText = e.target.value
        // перерисовываем только список, чтобы поле ввода не теряло фокус
        this.renderCards()
    }

    clickAdd() {
        addSportSectionCopy()
        this.renderCards()
    }

    clickDetails(e) {
        const sportSectionId = e.target.dataset.id
        const sectionPage = new SectionPage(this.parent, sportSectionId)
        sectionPage.render()
    }

    clickRemove(e) {
        const sportSectionId = e.target.dataset.id
        removeSportSection(sportSectionId)
        this.renderCards()
    }

    renderCards() {
        this.cardsRoot.innerHTML = ''
        const sportSections = getSportSections(this.filterText)

        if (sportSections.length === 0) {
            this.cardsRoot.insertAdjacentHTML('beforeend', '<p class="text-muted">Секции не найдены</p>')
            return
        }

        sportSections.forEach(sportSection => {
            const sportSectionCard = new SportSectionCardComponent(this.cardsRoot)
            // bind(this): внутри обработчика this останется страницей, а не кнопкой
            sportSectionCard.render(sportSection, this.clickDetails.bind(this), this.clickRemove.bind(this))
        })
    }

    render() {
        this.parent.innerHTML = ''
        this.parent.insertAdjacentHTML('beforeend', this.getHTML())

        const clubHeader = new ClubHeaderComponent(document.getElementById('club-header-root'))
        clubHeader.render(this.clickHome.bind(this))

        const sectionsFilter = new SectionsFilterComponent(document.getElementById('sections-filter-root'))
        sectionsFilter.render(this.filterText, this.inputFilter.bind(this))

        document.getElementById('section-add').addEventListener('click', this.clickAdd.bind(this))

        this.renderCards()
    }
}
