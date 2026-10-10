// карточка секции на главной странице
export class SportSectionCardComponent {
    constructor(parent) {
        this.parent = parent
    }

    addListeners(sportSection, detailsListener, removeListener) {
        document
            .getElementById(`section-details-${sportSection.id}`)
            .addEventListener('click', detailsListener)
        document
            .getElementById(`section-remove-${sportSection.id}`)
            .addEventListener('click', removeListener)
    }

    getHTML(sportSection) {
        // data-id хранит id секции: по нему обработчик поймёт, на какой карточке нажали
        return (
            `
                <div class="card club-card">
                    <img class="card-img-top" src="${sportSection.imageSrc}" alt="${sportSection.sportName}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title club-card__title">${sportSection.sportName}</h5>
                        <p class="card-text mb-1">Тренер: ${sportSection.coachName}</p>
                        <p class="card-text mb-3">Возраст: ${sportSection.ageGroup}</p>
                        <p class="club-card__price mt-auto">${sportSection.monthlyPrice} ₽ / мес.</p>
                        <div class="d-flex gap-2">
                            <button id="section-details-${sportSection.id}" data-id="${sportSection.id}"
                                    class="btn club-btn club-btn--red flex-grow-1" type="button">Подробнее</button>
                            <button id="section-remove-${sportSection.id}" data-id="${sportSection.id}"
                                    class="btn club-btn club-btn--grey" type="button">Удалить</button>
                        </div>
                    </div>
                </div>
            `
        )
    }

    render(sportSection, detailsListener, removeListener) {
        const html = this.getHTML(sportSection)
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(sportSection, detailsListener, removeListener)
    }
}
